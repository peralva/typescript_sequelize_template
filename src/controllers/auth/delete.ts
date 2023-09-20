import { Request, Response } from 'express';
import Token from '../../models/Token.js';
import getCookie from '../../utils/getCookie.js';

export default async (req: Request, res: Response) => {
    const token = getCookie(req.headers.cookie, 'token');

    if (token) {
        await Token.destroy({
            where: { value: token },
        });

        res.clearCookie('token');
    }
};
