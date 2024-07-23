import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://xchange-hjil.onrender.com/graphql',
  }),
  cache: new InMemoryCache(),
});

export default client;
