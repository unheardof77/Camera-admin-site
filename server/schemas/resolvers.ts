import  User  from '../models/User';
import Admin from '../models/Admin';
import { GraphQLError } from 'graphql';
import { signToken } from '../utils/auth';

import { Context, signupArgs, AdminArgs, File } from '../utils/types';

import {GraphQLUpload} from 'graphql-upload-ts';
import bucket from '../storage';

const resolvers = {
    Upload: GraphQLUpload,
    Query: {
                getUser: async (_:any, __:any, context:Context) => {
            return await User.findById(context.user._id)
        },
        getAllAdmins: async () => {
            return await Admin.find({});
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
        createAdmin: async (_:any, args:AdminArgs) => {
            const admin = await Admin.create(args);
            return admin;
        },
        singleUpload: async (_:any, {file }:any) =>{
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
                console.log(`File ${file.filename}, encoding ${file.encoding}, mimetype ${file.mimetype} uploaded successfully`);
            });
            return {filename, mimetype, encoding}
        }
    }

}

export default resolvers;