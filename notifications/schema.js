const { gql } = require("apollo-server");

const typeDefs = gql`
    type Notification @key(fields: "target") {
        id: ID!
        emisor: String!
        emisorId: String!
        notitype: String!
        target: String!
        status: String!
    }

    input notiInput {
        notitype: String!
        target: String!
        status: String!
        emisor: String!
        emisorId: String!
    }

    input deleteNotiInput {
        id: String!
    }

    extend type Query {
        getnotis: [Notification]!
    }

    extend type Mutation {
        friendreq(input: notiInput!): Notification!
        deleteNoti(input: deleteNotiInput): Notification
    }
`;

module.exports = typeDefs;
