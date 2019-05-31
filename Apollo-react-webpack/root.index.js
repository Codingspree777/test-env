import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { withClientState } from "apollo-link-state";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import "./App.css";
// import App from "./client/components/App";

//Apollo Aperture Cache
const cache = new InMemoryCache();

//graphQL schema
const typeDefs = `
  type User {
    id: Int!
    text: String!
    name: String
    userName: String
    department: String
    access: String
    completed: Boolean!
  }

  type Mutation {
    addUser(
      text: String!,
      name: String,
      userName: String,
      department: String,
      access: String,
      ): User
    updateUser(
      id:ID!
      text: String!,
      name: String,
      userName: String,
      department: String,
      access: String,
      ): User
    toggleUser(id: Int!): User
    deleteUser(id:Int!):User
  }

  type Query {
    visibilityFilter: String
    Users: [User]
  }
`;



//Apollo Aperture Store
const store = new ApolloClient({
  cache,
  link: withClientState({cache}),
});

ReactDOM.render(
  <ApolloProvider client={store}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
