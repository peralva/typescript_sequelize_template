import crypto from 'crypto';

export default (
    password: string,
    username: string,
    company: number,
) => crypto.createHash('sha512').update(`${company}:${username}:${password}`, 'utf-8').digest('hex');
