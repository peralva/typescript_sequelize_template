import { Request, Response } from 'express';
import Token from '../../models/Token.js';
import User from '../../models/User.js';
import HttpError from '../../utils/HttpError.js';
import cryptoPassword from '../../utils/cryptoPassword.js';

export default async (req: Request, res: Response) => {
    const result = await User.findOne({
        where: {
            company_id: req.body.company_id,
            username: req.body.username,
        },
        attributes: [
            'id',
            'enabled',
            'password',
        ],
    });

    if (!result) {
        throw new HttpError('Usuário não encontrado', 404);
    }

    if (!result.enabled) {
        throw new HttpError('Usuário desativado', 401);
    }

    req.body.password = cryptoPassword(req.body.password, req.body.username, req.body.company_id);

    if (req.body.password !== result.password) {
        throw new HttpError('Senha inválida', 401);
    }

    const token = await Token.create({
        user_id: result.id,
        value: '',
    });

    res.cookie(
        'token',
        token.value,
        { httpOnly: true },
    );
};
