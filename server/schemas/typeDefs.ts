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

    type Auth {
        token: ID
        user: User
    }

    type Query {
        getUser: User
    }
    type Mutation {
        signup(username: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
    }
`;

export default typeDefs