import Layout from '../components/layout';
import type { AppProps } from 'next/app';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import  createUploadLink  from 'apollo-upload-client/createUploadLink.mjs';



const createApolloClient = (cache = {}) => {
    return new ApolloClient({
        cache: new InMemoryCache().restore(cache),
        link: createUploadLink({
            uri: "http://localhost:4000/graphql",
            headers: {
                "Apollo-Require-Preflight": "true",
            },
            fetchOptions:{
                credentials:"include"
            }
        }),
        credentials:'include'
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