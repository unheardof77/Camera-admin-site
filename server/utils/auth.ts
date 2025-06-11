import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { authMiddlewareProp, signTokenProp } from './types';
dotenv.config();

const secret:any = process.env.JWT_SECRET
const expiration = '2h';




export const authMiddleware = function ({ req }: authMiddlewareProp) {
    let token = req.headers.authorization;

    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    };

    if (!token) {
        return req;
    };

    try {
        const   {data}:any   = jwt.verify(token, secret, { maxAge: expiration });
        console.log(data);
        req.user = data;
    } catch {
        console.log('Invalid token');
    }

    return req;
}
export const signToken = function ({ _id, username }:signTokenProp) {
    const payload = { _id, username };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}