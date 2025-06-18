import mongoose from 'mongoose';

export interface signupArgs {
    username: string;
    password: string;
}

export interface AdminArgs {
    username: string;
    password: string;
    adminPassword: string;
}

export interface CreateEmployeeArgs{
    username: string;
    password: string;
}

export interface createOrgOwnerArgs {
    username: string;
    password: string;
    orgName: string;
}

export interface GetOneVideoArgs {
    filename: string;
}

export interface AdminInt {
    username: string;
    password: string;
    _id: mongoose.Types.ObjectId;
}
export interface AdminMethods {
    isCorrectPassword(password:string): boolean;
};

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
    userData: userInt;
    res: any;
    req: any;
}

export interface authMiddlewareProp {
    req: any
    res: any
}

export interface signTokenProp {
    username: string
    _id: mongoose.Types.ObjectId
    isOrgOwner?: boolean
    groupId?: mongoose.Types.ObjectId
}

export interface File {
    filename: string;
    mimetype: string;
    encoding: string;
}