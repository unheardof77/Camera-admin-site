import  User  from '../models/User';
import { Context, signupArgs } from '../utils/types';
import { signToken } from '../utils/auth';
import { GraphQLError } from 'graphql';

const resolvers = {
    Query: {
                getUser: async (_:any, __:any, context:Context) => {
            return await User.findById(context.user._id)
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
        }
    }

}

export default resolvers;