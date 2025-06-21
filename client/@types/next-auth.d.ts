import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session  {
        user: Admin | User
        authToken: string
    }
    interface Admin extends User {
        isAdmin:boolean
    }
    interface User {
        _id: string 
        username: string
        groupId: string
        isOrgOwner: boolean
        isAdmin?:boolean
    }
    interface JWT {
        id?: string
        username?:string
    }
}