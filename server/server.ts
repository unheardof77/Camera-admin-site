import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';

import db from './config/connection'

import typeDefs from './schemas/typeDefs';
import resolvers from './schemas/resolvers';

import { authMiddleware } from './utils/auth';

import {graphqlUploadExpress} from 'graphql-upload-ts';

import { Context } from './utils/types';

async function startServer() {
    const server = new ApolloServer<Context>({
        typeDefs,
        resolvers, 
        csrfPrevention: true,
        cache: 'bounded',
        context: authMiddleware,
        
    });
    await server.start();
    const app:any = express();
    app.use(cookieParser())
    app.use(graphqlUploadExpress());
    server.applyMiddleware({app, cors:{credentials:true, origin: 'http://localhost:3000'}});
    await db.once('open', ()=>{console.log('Connected to MongoDB')});
    await new Promise<void>(r=> app.listen({ port: 4000 }, r));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

}
startServer()