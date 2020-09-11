import gql from "graphql-tag";

const ADD_USER = gql`
  mutation CreateUser($newuser: newUserInput!) {
    newUser(input: $newuser) {
      nickname
      fullname
      email
      id
    }
  }
`;

const LOGIN = gql`
  mutation Login($loginuser: loginInput!) {
    login(input: $loginuser) {
      email
      nickname
      fullname
      id
    }
  }
`;
const CONTACT_ACC = gql`
  mutation Addcontact($contactid: idInput!) {
    addcontact(input: $contactid) {
      contacts {
        id
        nick
      }
      userId
    }
  }
`;
const FRIEND_PETITION = gql`
  mutation Friendreq($notin: notiInput!) {
    friendreq(input: $notin) {
      emisor
      emisorId
      target
      notitype
      status
    }
  }
`;
const CREATE_ROOM = gql`
  mutation CreateRoom($roomi: RoomInput!) {
    createRoom(input: $roomi) {
      members
      admin
      title
      type
      createdAt
      updatedAt
      id
    }
  }
`;
const CREATE_MESSAGE = gql`
  mutation CreateMessage($messagei: MessageInput!) {
    createMessage(input: $messagei) {
      id
      content
      createdAt
      owner
      roomId
    }
  }
`;
const GET_ROOMS = gql`
  mutation ListRooms($getroomsi: listRoomsInput!) {
    listRooms(input: $getroomsi) {
      id
      title
      content
      createdAt
      owner
      roomId
    }
  }
`;
const GET_MESSAGES = gql`
  mutation GetMessages($getmesi: getMessagesInput!) {
    getMessages(input: $getmesi) {
      id
      content
      createdAt
      owner
      roomId
    }
  }
`;
const LOGOUT = gql`
  mutation Logout {
    logout {
      id
    }
  }
`;

const DELETE = gql`
  mutation DeleteNoti($deletei: deleteNotiInput) {
    deleteNoti(input: $deletei) {
      id
    }
  }
`;
export {
  DELETE,
  GET_MESSAGES,
  GET_ROOMS,
  ADD_USER,
  LOGIN,
  CONTACT_ACC,
  FRIEND_PETITION,
  CREATE_ROOM,
  CREATE_MESSAGE,
  LOGOUT,
};
