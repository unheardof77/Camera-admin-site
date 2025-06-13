import Layout from '../components/layout';
import type { AppProps } from 'next/app';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import  createUploadLink  from 'apollo-upload-client/createUploadLink.mjs';


const createApolloClient = (cache = {}) => {
    return new ApolloClient({
        cache: new InMemoryCache().restore(cache),
        link: createUploadLink({
            uri: "/graphql",
            headers: {
                "Apollo-Require-Preflight": "true"
            }
        })
    })
}

export default function MyApp({Component, pageProps}: AppProps) {
    return (
        <ApolloProvider client={createApolloClient()}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider>
    )
};