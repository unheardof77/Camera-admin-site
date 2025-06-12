import  User  from '../models/User';
import Admin from '../models/Admin';
import { GraphQLError } from 'graphql';
import { signToken } from '../utils/auth';

import { Context, signupArgs, AdminArgs } from '../utils/types';

const resolvers = {
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
        }
    }

}

export default resolvers;