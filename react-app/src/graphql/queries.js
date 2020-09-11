import gql from "graphql-tag";

const GET_USERS = gql`
  {
    getallusers {
      email
      nickname
      fullname
      id
    }
  }
`;

const GET_CONTACTS = gql`
  {
    getcontacts {
      id
      nick
    }
  }
`;

const GET_ROOMS = gql`
  {
    listRooms {
      id
      title
      type
      members
      createdAt
      updatedAt
      admin
    }
  }
`;

const GET_NOTIS = gql`
  {
    getnotis {
      target
      emisor
      notitype
      status
      id
    }
  }
`;

const GET_USER = gql`
  {
    getuser {
      nickname
      fullname
      email
      # contacts
      id
    }
  }
`;

export { GET_USERS, GET_CONTACTS, GET_NOTIS, GET_ROOMS, GET_USER };
