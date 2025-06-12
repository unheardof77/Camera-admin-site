const typeDefs = `#graphql
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
        }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        getUser: User
        getAllAdmins: [Admin]
    }

    type Mutation {
        signup(username: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
        createAdmin(username: String!, password: String!): Admin
    }
`;

export default typeDefs