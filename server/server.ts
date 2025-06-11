import express from 'express';
import {ApolloServer} from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import path from 'path';
import db from './config/connection'

import typeDefs from './schemas/typeDefs';
import resolvers from './schemas/resolvers';

import { authMiddleware } from './utils/auth';

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
};

db.once('open', async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: authMiddleware,
    });
    console.log(`🚀  Server ready at: ${url}`);
}
)
