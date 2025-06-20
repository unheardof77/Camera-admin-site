import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { authMiddlewareProp, signTokenProp } from './types';
import { GraphQLError } from 'graphql';
dotenv.config();

const secret:any = process.env.JWT_SECRET
const expiration = '2h';


const routeAuthHelper = (operationname:string, loggedIn:boolean)=>{
    let allowUserThrough = false;
    console.log(operationname, loggedIn)
    if(loggedIn){
        //protected routes
        switch(operationname){
            case "One_Video" : allowUserThrough = true; break;
            case "All_Videos": allowUserThrough = true; break;
            case "Upload": allowUserThrough = true; break;
            case "Create_Org_Owner": allowUserThrough = true; break;
            case "Create_Employee": allowUserThrough = true; break;
            default: allowUserThrough = false;
        }
    }else{//non-protected routes
        switch(operationname){
            case "Login": allowUserThrough = true; break;
            case "Admin_Signup": allowUserThrough = true; break;
            default: allowUserThrough = false;
        }
    }
    return allowUserThrough;
}




export const authMiddleware = function ({ req, res }: authMiddlewareProp) {
    const operationName = req.body.operationName;
    let userData;
    let cookie = req.cookies.authCookie;
    let loggedIn = false;
    console.log("cookie", cookie)
    if(cookie){
        cookie = cookie.split(' ').pop().trim();
    } 
    try {
        const {data}:any = jwt.verify(cookie, secret, {maxAge: expiration})
        userData = data;
        loggedIn = true;
    } catch(err){
        console.error('invalid token', err);
        loggedIn = false;
    }
    if(routeAuthHelper(operationName, loggedIn)){
        return {req, res, userData};
    }else {
        throw new GraphQLError("Route is protected.")
    }
    
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