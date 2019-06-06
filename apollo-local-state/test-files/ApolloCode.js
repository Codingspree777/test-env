import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: withClientState({cache})
});

module.exports = client;