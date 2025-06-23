import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LOGIN, ADMIN_LOGIN } from "../../../utils/crud/Mutation";

export const authOptions = {
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: "Employee-Organization login",
            name: 'Employees/Organization owners, login using your username and password.',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                try{
                    const userData = await fetch('/graphql', {
                        method: 'post',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ query: LOGIN, variables: credentials, operationName: "Login" })
                    });
                    
                    const jsonData = await userData.json();
                    return jsonData?.data?.login;
                }catch(err){
                    console.error(err)
                    return null;
                }
            }
        }),
        CredentialsProvider({
            id: "Admin Login",
            name: 'Admins login here.',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {
                try {
                    const admin = await fetch('/graphql', {
                        method: 'post',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ query: ADMIN_LOGIN, variables: credentials, operationName: "admin_Login" })
                    });

                    const jsonAdmin = await admin.json();
                    const newData: any = {
                        user: jsonAdmin.data?.adminLogin?.admin,
                        token: jsonAdmin.data?.adminLogin?.token
                    }
                    newData.user.isOrgOwner = true;
                    return newData;
                } catch (err) {
                    console.error(err)
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            user && (token.user = user.user)
            user && (token.authToken = user.token)
            return token
        },
        session({ session, token }: any) {
            console.log("session func token obj", JSON.stringify(token, null, 2))
            session.user = token.user;
            session.authToken = token.authToken;
            return session;
        }
    }
}

export default NextAuth(authOptions);