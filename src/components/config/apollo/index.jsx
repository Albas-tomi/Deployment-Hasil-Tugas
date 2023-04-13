import { ApolloClient, InMemoryCache, HttpLink, gql, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://open-yeti-17.hasura.app/v1/graphql',
  connectionParams: {
    headers: {
      'x-hasura-admin-secret': `NKy2AkLi0T4hUlEsOIUwXBfenl7v1T4qXgtXoN7Q2QgtKy5iUdl99UKfCFEvWb2U`
  },
  },
}));

const httpLink = new HttpLink({
  uri: 'https://open-yeti-17.hasura.app/v1/graphql',
  headers: {
      'x-hasura-admin-secret': `NKy2AkLi0T4hUlEsOIUwXBfenl7v1T4qXgtXoN7Q2QgtKy5iUdl99UKfCFEvWb2U`
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
)

const apolloClient = new ApolloClient({
    uri: 'https://flyby-router-demo.herokuapp.com/',
    link: splitLink,
    cache: new InMemoryCache(),
  });

  export default apolloClient;