const { gql } = require("apollo-server");

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
    type User @key(fields: "id") {
        id: ID
        nickname: String!
        fullname: String!
        email: String!
        contacts: [String]!
    }

    input newUserInput {
        nickname: String!
        fullname: String!
        email: String!
        password: String!
    }

    input loginInput {
        email: String!
        password: String!
    }

    input getUserInput {
        email: String!
    }

    extend type Query {
        getuser: User!
        getallusers: [User]!
        getusersbyemail(input: getUserInput): [User]!
    }

    extend type Mutation {
        newUser(input: newUserInput!): User!
        login(input: loginInput!): User!
        logout: User
        logoutall: User
    }
`;

module.exports = typeDefs;
