import NextAuth from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";
import { LOGIN } from "@/utils/crud/Mutation";

export const authOptions = {
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Sign in using your username and password.',
            credentials: {
                username: { label: "Username", type: "text"},
                password: { label: "Password", type: "password" }
            }, 


            async authorize(credentials) {
                const userData = await fetch('http://localhost:4000/graphql', {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({query:LOGIN, variables: credentials, operationName: "Login"})
                });
                
                const jsonData = await userData.json();
                return jsonData?.data?.login;
            }
        })
    ],
    callbacks: {
        async jwt({token, user}:any) {
            // This runs on sign-in and subsequent requests
            user && (token.user = user.user)
            user && (token.authToken = user.token)
            return token
        },
        session({session, token}:any) {
            console.log("session func token obj", JSON.stringify(token, null, 2))
            session.user = token.user;
            session.authToken = token.authToken;
            return session;
        }
    }
}

export default NextAuth(authOptions);