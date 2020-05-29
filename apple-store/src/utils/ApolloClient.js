import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
// import { setContext } from "apollo-link-context";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory";
import introspectionQueryResultData from "./fragmentTypes.json";

// Configure fragment matcher
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

// get mrm api link from environment variables
// const { MRM_API_URL } = process.env || {};
const { APPLESTORE_API_URL } = `http://localhost:3001/graphql`;

// create a concatenatable http link for apollo
const httpLink = createHttpLink({
  uri: APPLESTORE_API_URL,
});

// create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({ fragmentMatcher }),
});

export default apolloClient;
