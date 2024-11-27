

import { requestUserObject } from "./request";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const userObjectApi = async (x: any) => {
  return await requestUserObject(x);
};

class TCacheShape {}

export const client = new ApolloClient({
  uri: 'https://market.swiftnftmarket.io/gql/query',
  // uri: 'http://172.20.10.2:9000/gql/query',
  cache: new InMemoryCache(),
}) as ApolloClient<TCacheShape>;
9