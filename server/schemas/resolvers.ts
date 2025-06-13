import  User  from '../models/User';
import Admin from '../models/Admin';
import { GraphQLError } from 'graphql';
import { signToken } from '../utils/auth';

import { Context, signupArgs, AdminArgs, File } from '../utils/types';

import {GraphQLUpload} from 'graphql-upload-ts';
import connec from '../config/connection';
import mongoose from 'mongoose';
import { GridFSBucketReadStream } from 'mongodb';

interface getOneVideoArgs {
    filename: string;
}

const resolvers = {
    Upload: GraphQLUpload,
    Query: {
            getUser: async (_:any, __:any, context:Context) => {
                return await User.findById(context.user._id)
            },
            getAllAdmins: async () => {
                return await Admin.find({});
            },
            getOneVideo: async (_:any, {filename}:getOneVideoArgs) => {
                const db = connec.db;
                if(!db){
                    throw new GraphQLError('Database connection is not established');
                }
                const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "Video-files" });
                if(!bucket){
                    throw new GraphQLError('GridFS bucket is not initialized');
                }
                const readStream = bucket.openDownloadStreamByName(filename);
                if(!readStream){
                    throw new GraphQLError(`File with name ${filename} not found`);
                }

                const fileChunks: Buffer[] = [];

                return new Promise<string>((resolve, reject) => {
                    readStream.on('data', (chunk: Buffer) => {
                        fileChunks.push(chunk);
                    })
                    readStream.on('error', (err: any) => {
                        reject(new GraphQLError(`Error reading file: ${err.message}`));
                    });
                    readStream.on('end', () => {
                        const fileBuffer = Buffer.concat(fileChunks);
                        const base64Str = fileBuffer.toString('base64');
                        resolve(base64Str);
                    });
                });
                
            }
    }, 
    Mutation: {
        signup: async (_:any, args:signupArgs) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
        }, 
        login: async (_:any, {username, password}:signupArgs) => {
            const user = await User.findOne({username});
            if(!user) {
                throw new GraphQLError('No user found with this username');
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new GraphQLError('Incorrect password');
            }
            const token = signToken(user);
            return {token, user};
        },
        createAdmin: async (_:any, {adminPassword, username, password}:AdminArgs) => {
            if(adminPassword == process.env.ADMIN_PASSWORD){
                const admin = await Admin.create({username, password});
                const token = signToken(admin);
                return {token, admin};
            } else {
                throw new GraphQLError('Incorrect admin password');
            }
        },
        singleUpload: async (_:any, {file }:any) =>{
            const db = connec.db;
            if(!db){
                throw new GraphQLError('Database connection is not established');
            }
            const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "Video-files" });

            if(!bucket){
                throw new GraphQLError('GridFS bucket is not initialized');
            }
            const { createReadStream, filename, mimetype, encoding} = await file;
            const stream = createReadStream();

            const uploadStream = bucket.openUploadStream(filename);``
            stream.pipe(uploadStream);
            uploadStream.on('error', (error:any) => {
                throw new GraphQLError(`Error uploading file: ${error.message}`);
            });
            uploadStream.on('finish', (file:File) => {
                console.log(`uploaded successfully`);
            });
            return {filename, mimetype, encoding}
        }
    }

}

export default resolvers;