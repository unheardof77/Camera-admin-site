import Layout from '../components/layout';
import type { AppProps } from 'next/app';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import  createUploadLink  from 'apollo-upload-client/createUploadLink.mjs';

import { useEffect, useState } from 'react';





export default function MyApp({Component, pageProps}: AppProps) {
    const [statefulToken, setStatefulToken] = useState("");
    
    useEffect(()=>{
        const token = localStorage.getItem('id_token') ||""; 
        setStatefulToken(token);
        console.log(token)
    }, []);

        useEffect(()=>{
        console.log(statefulToken);
    }, [statefulToken]);

    const createApolloClient = (cache = {}) => {
        
        return new ApolloClient({
            cache: new InMemoryCache().restore(cache),
            link: createUploadLink({
                uri: "http://localhost:4000/graphql",
                headers: {
                    "Apollo-Require-Preflight": "true",
                    "Authorization": statefulToken? `Bearer ${statefulToken}`: ''
                }
            })
        })
    }


    return (
        <ApolloProvider client={createApolloClient()}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider>
    )
};