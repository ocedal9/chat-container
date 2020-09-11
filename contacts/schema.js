const { gql } = require("apollo-server");

const typeDefs = gql`
    type cont {
        id: String!
        nick: String!
    }

    type ownerCont @key(fields: "userId") {
        userId: String!
        contacts: [cont]!
    }

    input idInput {
        id: String!
        nick: String!
        ownNick: String!
    }
    extend type Query {
        getcontacts: [cont]!
    }
    extend type Mutation {
        addcontact(input: idInput!): ownerCont!
        createcontacts: [cont]
    }
`;

module.exports = typeDefs;
