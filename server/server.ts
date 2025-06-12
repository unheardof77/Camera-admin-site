import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

interface Context {
    user?: any;
}
import { startStandaloneServer } from '@apollo/server/standalone';
import path from 'path';
import db from './config/connection'

import typeDefs from './schemas/typeDefs';
import resolvers from './schemas/resolvers';

import { authMiddleware } from './utils/auth';

import {graphqlUploadExpress} from 'graphql-upload-ts';


// const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded'
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(graphqlUploadExpress({maxFileSize: 10000000, maxFiles: 10}));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
};



db.once('open', async () => {
    app.listen(3000, async () => {

        const { url } = await startStandaloneServer(server, {
            listen: { port: 4000,  },
            context: authMiddleware,
            
        });
        console.log(`🚀  Server ready at: ${url}`);
    })});

// async function startServer() {
//     const server = new ApolloServer<Context>({
//         typeDefs,
//         resolvers, 
//         csrfPrevention: true,
//     });
//     await server.start();
//     app.use(
//         '/graphql',
//         expressMiddleware<Context>(server, {
//             context: async ({ req }) => ({
//                 user: (req as any).user,
//             }),
//         }),
//         authMiddleware,
//     );
//     await new Promise<void>(r => app.listen({ port: 4000 }, r));
//     console.log(`🚀 Server ready at http://localhost:4000`);
// }
// startServer()