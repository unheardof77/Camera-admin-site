import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session  {
        user: {
            _id: string 
            username: string
            groupId: string
            isOrgOwner: boolean
        }
        authToken:string
    }
    interface User {
        _id: string 
        username: string
        groupId: string
        isOrgOwner: boolean
    }
    interface JWT {
        id?: string
        username?:string
    }
}