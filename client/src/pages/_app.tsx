import Layout from '../components/layout';
import type { AppProps } from 'next/app';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import  createUploadLink  from 'apollo-upload-client/createUploadLink.mjs';

import { SessionProvider } from 'next-auth/react';


const createApolloClient = (cache = {}) => {
    return new ApolloClient({
        cache: new InMemoryCache().restore(cache),
        link: createUploadLink({
            uri: "http://localhost:4000/graphql",
            headers: {
                "Apollo-Require-Preflight": "true",
            }
        })
    })
}

export default function MyApp({Component, pageProps:{session, ...pageProps}}: AppProps) {
    
    

    return (
        <ApolloProvider client={createApolloClient()}>
            <SessionProvider session={session}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SessionProvider>
        </ApolloProvider>
    )
};