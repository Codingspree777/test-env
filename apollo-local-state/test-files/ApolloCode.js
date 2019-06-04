
// import 'cross-fetch/polyfill';
// import ApolloClient from "apollo-boost/lib/index";
// import { gql } from "apollo-boost";

import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
const defaults = {
  users: [],
  visibilityFilter: 'SHOW_ALL'
};
let nextUserId = 0;
const resolvers = {
  Mutation: {
    addUser: (_, {
      text,
      name,
      userName,
      department,
      access
    }, {
      cache
    }) => {
      const query = gql`
        query GetUsers {
          users @client {
            id
            text
            name
            userName
            department
            access
            completed
          }
        }
      `;
      const previous = cache.readQuery({
        query
      });
      console.log('data', previous.users);
      const newUser = {
        id: nextUserId++,
        text,
        name,
        userName,
        department,
        access,
        completed: false,
        __typename: 'UserItem'
      };
      const data = {
        users: previous.users.concat([newUser])
      }; // if (
      //   name === '' ||
      //   userName === '' ||
      //   department === '' ||
      //   access === ''
      // ) {
      //   alert('all field is required');
      // } else {
      // user Name Validation

      const validation = previous.users.find(user => user.userName === userName); // if (validation === undefined) {

      cache.writeData({
        data
      });
      return newUser; //   }
      //   alert('user name is already in use');
      // // }
    },
    updateUser: (_, variables, {
      cache
    }) => {
      const query = gql`
        query GetUsers {
          users @client {
            id
            text
            name
            userName
            department
            access
            completed
          }
        }
      `;
      const id = `UserItem:${variables.id}`;
      const previous = cache.readQuery({
        query
      }); // user Name Validation

      const validation = previous.users.find(user => {
        user.userName === variables.userName;
      });

      if (validation === undefined) {
        const data = { ...variables
        };
        cache.writeData({
          id,
          data
        });
        return null;
      }

      alert('user name is already in use');
    },
    deleteUser: (_, variables, {
      cache
    }) => {
      const query = gql`
        query Users {
          users @client {
            id
            text
            name
            userName
            department
            access
            completed
          }
        }
      `;
      console.log('variable', variables);
      const previous = cache.readQuery({
        query
      });
      const data = {
        users: previous.users.filter(user => user.id !== variables.id)
      };
      cache.writeData({
        data
      });
      return data;
    },
    toggleUser: (_, variables, {
      cache
    }) => {
      const id = `UserItem:${variables.id}`;
      const fragment = gql`
        fragment completeUser on UserItem {
          completed
        }
      `;
      const user = cache.readFragment({
        fragment,
        id
      });
      const data = { ...user,
        completed: !user.completed
      };
      cache.writeData({
        id,
        data
      });
      return null;
    }
  }
};
const cache = new InMemoryCache();
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
`; //console.log(typeDefs);

const client = new ApolloClient({
  cache,
  link: withClientState({
    cache,
    typeDefs,
    resolvers
  })
}); 


module.exports = client