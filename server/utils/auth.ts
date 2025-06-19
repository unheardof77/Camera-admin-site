import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { authMiddlewareProp, signTokenProp } from './types';
dotenv.config();

const secret:any = process.env.JWT_SECRET
const expiration = '2h';




export const authMiddleware = function ({ req, res }: authMiddlewareProp) {
    let cookie = req.cookies.authCookie;
    console.log("cookie", cookie)
    let userData;
    if(cookie){
        cookie = cookie.split(' ').pop().trim();
    } else {
        return {req,res}
    }
    try {
        const {data}:any = jwt.verify(cookie, secret, {maxAge: expiration})
        userData = data;
    } catch(err){
        console.error('invalid token', err);
    }
    return {req, res, userData};
}

export const sendCookie = function(res:any, token:string, logThemIn:boolean = false){
    res.cookie('authCookie', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    })

    if(logThemIn){
        res.cookie('loggedIn', true, {
            httpOnly: false,
            secure:false, 
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
        })
    }
}


export const signToken = function ({ _id, username, groupId, isOrgOwner = false }:signTokenProp) {
    const payload = { _id, username, isOrgOwner, groupId  };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}