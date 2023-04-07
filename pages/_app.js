import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import '../styles/globals.css';
import { setContext } from '@apollo/client/link/context';
import Navbar from '../components/Navbar';

const httpLink = createHttpLink({
  uri: '/api/graphql', 
});

const authLink = setContext((_, { headers }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('id_token') : null;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;


