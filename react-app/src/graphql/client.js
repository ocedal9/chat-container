import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
// import { WebSocketLink } from "apollo-link-ws";
import { ApolloLink, concat } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import cookies from "cookiesjs";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const authLink = new ApolloLink((operation, forward) => {
  const token = cookies("token");
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

// const wslink = new WebSocketLink({
//   uri: "ws://localhost:4000/graphql",
// });

// const link = ApolloLink.from([httpLink, authLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  // link,
  link: concat(authLink, httpLink),
  cache,
  // request(operation) {
  //   const token = cookies("token");
  //   // console.log(token);

  //   operation.setContext({
  //     headers: {
  //       authorization: token ? `Bearer ${token}` : "",
  //     },
  //   });
  // },
});

export default client;
