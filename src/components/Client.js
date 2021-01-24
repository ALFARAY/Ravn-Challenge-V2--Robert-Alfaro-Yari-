import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  // URL de backend
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index/",
});

export default client;
