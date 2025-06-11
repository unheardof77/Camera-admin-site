import mongoose from 'mongoose';

export interface signupArgs {
    username: string;
    password: string;
}

export interface userInt {
    username:string;
    password:string;
    _id:mongoose.Types.ObjectId;
    groupId:mongoose.Types.ObjectId;
    isOrgOwner:boolean;
}

export interface GroupInt {
    _id: mongoose.Types.ObjectId;
    groupName: string;
}

export interface userMethods {
    isCorrectPassword(password:string): boolean;
};

export interface Context {
    user: userInt;
}

export interface authMiddlewareProp {
    req: any
}

export interface signTokenProp {
    username: string
    _id: mongoose.Types.ObjectId
}
