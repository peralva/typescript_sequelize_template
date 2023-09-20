import http from 'http';
import express, { Application, NextFunction, Request, Response } from 'express';
import fs from 'fs';
import url from 'url';
import path from 'path';
import getCookie from './getCookie.js';
import HttpError from './HttpError.js';
import config from '../config.js';
import User from '../models/User.js';
import Token from '../models/Token.js';
import Group from '../models/Group.js';
import Endpoint from '../models/Endpoint.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATH_DYNAMIC_ROUTERS = '../controllers';
const REGEX = /{{(.*?)}}/g;

const pathParams = (() => {
    const getPathParams = (dir: string) => {
        const result: string[] = [];

        fs.readdirSync(
            dir,
            { withFileTypes: true },
        ).forEach((value) => {
            if (value.isDirectory()) {
                result.push(...getPathParams(`${dir}/${value.name}`));

                if (!result.length) {
                    const pathParam = `${dir.replace(`${__dirname}/${PATH_DYNAMIC_ROUTERS}`, '')}/${value.name}`;

                    if (REGEX.exec(pathParam)) {
                        result.push(pathParam);
                    }
                }
            }
        });

        return result;
    };

    return getPathParams(`${__dirname}/${PATH_DYNAMIC_ROUTERS}`);
})();

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (false
            || req.url !== '/auth'
            || !['POST', 'DELETE'].includes(req.method)
        ) {
            const token = getCookie(req.headers.cookie, 'token');

            if (!token) {
                throw new HttpError('Necessário primeiro fazer o login', 401);
            }

            const tokenModel = await Token.findOne({
                where: { value: token },
                include: {
                    model: User,
                    attributes: ['enabled'],
                    include: {
                        model: Group,
                        attributes: ['id'],
                        include: {
                            model: Endpoint,
                            attributes: [
                                'method',
                                'path',
                            ],
                        },
                    },
                },
            });

            if (!tokenModel) {
                res.clearCookie('token');
                throw new HttpError('Token inválido', 401);
            }

            const currentTime = new Date().getTime();
            const expired = tokenModel.updated_at.getTime() + config?.token_time < currentTime;

            if (false
                || expired
                || !tokenModel.user.enabled
            ) {
                await Token.destroy({
                    where: { id: tokenModel.id },
                });

                res.clearCookie('token');

                if (expired) {
                    throw new HttpError('Token expirado', 403);
                }

                if (!tokenModel.user.enabled) {
                    throw new HttpError('Usuário desativado', 403);
                }
            }

            if (!tokenModel.user.groups.some(
                (valueGroups: {
                    endpoints: {
                        method: string,
                        path: string
                    }[]
                }) => valueGroups.endpoints.some(
                    (valueEndpoints) => (true
                        && valueEndpoints.method === req.method
                        && valueEndpoints.path === req.url
                    ),
                ),
            )) {
                throw new HttpError('Usuário sem permissão', 403);
            }

            tokenModel.value = '';
            await tokenModel.save();

            res.cookie(
                'token',
                tokenModel.value,
                { httpOnly: true },
            );
        }

        next();
    } catch (err) {
        next(err);
    }
};

const getBody = (req: Request, _: Response, next: NextFunction) => {
    req.body = '';

    req.on(
        'data',
        (chunk) => {
            req.body += chunk;
        },
    );

    req.on(
        'end',
        () => {
            next();
        },
    );
};

const bodyToJSON = (req: Request, _: Response, next: NextFunction) => {
    try {
        req.body = JSON.parse(req.body);
    } catch (err) { /* empty */ }

    next();
};

const getPathParams = (req: Request, _: Response, next: NextFunction) => {
    const urlPath = req.url.split('/');

    pathParams.every((valuePathParams) => {
        const pathParam = valuePathParams.split('/');

        return pathParam.every((valuePathParam, index) => {
            if (true
                && valuePathParam.substring(0, 2) === '{{'
                && valuePathParam.substring(valuePathParam.length - 2) === '}}'
            ) {
                req.params[
                    valuePathParam.substring(2, valuePathParam.length - 2)
                ] = urlPath[index];
                urlPath[index] = valuePathParam;

                return true;
            }

            return valuePathParam === urlPath[index];
        });
    });

    req.url = urlPath.join('/');

    next();
};

const routers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pathController = `${PATH_DYNAMIC_ROUTERS}${req.url}/${req.method.toLowerCase()}.js`;

        const result = await (await import(pathController)).default(req, res, next);

        if (result === undefined) {
            res.status(204);
        } else if (req.method === 'POST') {
            res.status(201);
        } else {
            res.status(200);
        }

        res.json(result);

        next();
    } catch (err) {
        next(err);
    }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errors = async (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.status || 500);

    res.send({
        name: err.name,
        message: err.message,
        stack: err.stack,
    });
};

const startServer = (app: Application) => {
    const port = process.env.PORT || 80;

    http.createServer(app).listen(
        port,
        () => {
            console.info(`Webservice started  Port: ${port}  PID: ${process.pid}`);
        },
    );
};

export default () => {
    const app = express();

    app.use(validateToken);
    app.use(getBody);
    app.use(bodyToJSON);
    app.use(getPathParams);
    app.use(routers);
    app.use(errors);

    startServer(app);
};
