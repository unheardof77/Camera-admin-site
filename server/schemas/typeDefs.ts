const typeDefs = `#graphql
    scalar Upload
    type User {
        _id: ID
        username: String
        password: String
        isOrgOwner: Boolean
        groupId: ID
        }
        
    type Group {
        _id: ID
        groupName: String
        }

    type Admin {
        _id: ID
        username: String
        password: String
        isAdmin:Boolean
        }

        
        type Auth {
            token: ID
            user: User
            }
        
    type AdminAuth {
            token: ID
            admin: Admin
            }
            
        type upReturn {
            filename:String
            status:String
        }

    type Query {
        getUser: User
        getAllAdmins: [Admin]
        getOneVideo(filename: String!): String
        getAllVidFilenames: [String]
    }

    type Mutation {
        signup(username: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
        adminLogin(username: String!, password: String!):AdminAuth
        createAdmin(username: String!, password: String!, adminPassword: String!): AdminAuth
        singleUpload(file: Upload!): upReturn!
        createOrgOwner(username: String!, password: String!, orgName: String!): User
        createEmployee(username: String!, password: String!): User
    }
`;

export default typeDefs