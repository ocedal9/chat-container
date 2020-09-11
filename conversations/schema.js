const { gql } = require("apollo-server");

const typeDefs = gql`
    type Message {
        id: ID
        content: String!
        owner: String!
        createdAt: String!
        roomId: String!
    }

    type Room {
        id: ID
        title: String!
        type: String!
        admin: String!
        members: [String]!
        createdAt: String!
        updatedAt: String!
    }

    type UserRoom {
        id: ID
        roomId: String!
        userId: String!
        type: String!
        joinedAt: String!
    }

    type Query {
        listRooms: [Room]!
        # listMessagesForRoom(roomId: ID, sortDirection: ModelSortDirection): MessageConnection
        # listRooms(limit: Int): RoomConnection
    }

    type Mutation {
        createMessage(input: MessageInput): Message!
        createRoom(input: RoomInput): Room
        getMessages(input: getMessagesInput): [Message]!
    }

    input MessageInput {
        # id: ID
        content: String!
        owner: String!
        createdAt: String!
        roomId: String!
    }

    input getMessagesInput {
        roomId: String!
    }

    input RoomInput {
        title: String
        type: String!
        admin: String!
        members: [String!]
        createdAt: String!
        updatedAt: String!
    }
`;
module.exports = typeDefs;
