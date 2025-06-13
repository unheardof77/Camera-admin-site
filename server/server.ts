import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { expressMiddleware } from '@apollo/server/express4';

interface Context {
    user?: any;
}
import db from './config/connection'

import typeDefs from './schemas/typeDefs';
import resolvers from './schemas/resolvers';

import { authMiddleware } from './utils/auth';

import {graphqlUploadExpress} from 'graphql-upload-ts';

async function startServer() {
    const server = new ApolloServer<Context>({
        typeDefs,
        resolvers, 
        csrfPrevention: true,
        cache: 'bounded',
    });
    await server.start();
    const app:any = express();

    app.use(graphqlUploadExpress());
    server.applyMiddleware({app});
    await db.once('open', ()=>{console.log('Connected to MongoDB')});
    await new Promise<void>(r=> app.listen({ port: 4000 }, r));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

}
startServer()