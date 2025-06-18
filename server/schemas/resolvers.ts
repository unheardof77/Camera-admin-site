import User from '../models/User';
import Admin from '../models/Admin';
import Group from '../models/Group';
import { GraphQLError } from 'graphql';
import { signToken } from '../utils/auth';

import { Context, signupArgs, AdminArgs, File, createOrgOwnerArgs, CreateEmployeeArgs, GetOneVideoArgs } from '../utils/types';

import { GraphQLUpload } from 'graphql-upload-ts';
import connec from '../config/connection';
import mongoose from 'mongoose';


import { sendCookie } from '../utils/auth';





const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        getUser: async (_: any, __: any, context: Context) => {
            return await User.findById(context.userData._id)
        },
        getAllAdmins: async () => {
            return await Admin.find({});
        },
        getOneVideo: async (_: any, { filename }: GetOneVideoArgs) => {
            const db = connec.db;
            if (!db) {
                throw new GraphQLError('Database connection is not established');
            }
            const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "Video-files" });
            if (!bucket) {
                throw new GraphQLError('GridFS bucket is not initialized');
            }
            const readStream = bucket.openDownloadStreamByName(filename);
            if (!readStream) {
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

        },
        getAllVidFilenames: async () => {
            const db = connec.db;
            const arrOfFilenames: String[] = [];
            if (!db) {
                throw new GraphQLError('Database connection is not established');
            }
            const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "Video-files" });
            if (!bucket) {
                throw new GraphQLError('GridFS bucket is not initialized');
            }
            const cursor = await bucket.find({});
            for await (const doc of cursor){
                arrOfFilenames.push(doc.filename);
            }
            return arrOfFilenames;
        }, 
    },
    Mutation: {
        signup: async (_: any, args: signupArgs, {res}:Context) => {
            const user = await User.create(args);
            const token = signToken(user);
            sendCookie(res, token);
            return { token, user };
        },
        login: async (_: any, { username, password }: signupArgs, {res}:Context) => {
            const user = await User.findOne({ username });
            if (!user) {
                throw new GraphQLError('No user found with this username');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new GraphQLError('Incorrect password');
            }
            const token = signToken(user);
            sendCookie(res, token);
            return { token, user };
        },
        createAdmin: async (_: any, { adminPassword, username, password }: AdminArgs) => {
            if (adminPassword == process.env.ADMIN_PASSWORD) {
                const admin = await Admin.create({ username, password });
                const token = signToken(admin);
                return { token, admin };
            } else {
                throw new GraphQLError('Incorrect admin password');
            }
        },
        singleUpload: async (_: any, { file }: any) => {
            const db = connec.db;
            if (!db) {
                throw new GraphQLError('Database connection is not established');
            }
            const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "Video-files" });

            if (!bucket) {
                throw new GraphQLError('GridFS bucket is not initialized');
            }
            const { createReadStream, filename, mimetype, encoding } = await file;
            const stream = createReadStream();

            const uploadStream = bucket.openUploadStream(filename); ``
            stream.pipe(uploadStream);
            uploadStream.on('error', (error: any) => {
                throw new GraphQLError(`Error uploading file: ${error.message}`);
            });
            uploadStream.on('finish', (file: File) => {
                console.log(`uploaded successfully`);
            });
            return { filename, mimetype, encoding }
        },
        createOrgOwner: async (_: any, { username, password, orgName }: createOrgOwnerArgs) => {
            const newGroup = await Group.create({ groupName: orgName });
            const newOrgOwner = await User.create({ username, password, isOrgOwner: true, groupId: newGroup._id });
            if (!newOrgOwner) {
                throw new GraphQLError('Error creating organization owner');
            }
            return newOrgOwner;
        },
        createEmployee: async (_: any, { username, password }: CreateEmployeeArgs, context: Context) => {
            try {
                const groupId = context.userData.groupId;
                if (!groupId) {
                    throw new GraphQLError('You must be an organization owner to create employees');
                }
                const newEmployee = await User.create({ username, password, groupId });
                if (!newEmployee) {
                    throw new GraphQLError('Error creating employee');
                }
                return newEmployee
            } catch (err) {
                throw new GraphQLError('Error creating employee' + err);
            }
        }
    }

}

export default resolvers;