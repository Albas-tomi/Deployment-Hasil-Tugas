import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';

const apolloClient = new ApolloClient({
    uri: 'https://flyby-router-demo.herokuapp.com/',
    link: new HttpLink({
        uri: 'https://open-yeti-17.hasura.app/v1/graphql',
        headers: {
            'x-hasura-admin-secret': `NKy2AkLi0T4hUlEsOIUwXBfenl7v1T4qXgtXoN7Q2QgtKy5iUdl99UKfCFEvWb2U`
        }
      }),
    cache: new InMemoryCache(),
  });

  export default apolloClient;