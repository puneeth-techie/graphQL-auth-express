import { gql } from "apollo-server-express";

/** All user related typeDefs */
const userTypeDefs = gql`
  type Query {
    hello: String
  }
`;

export default userTypeDefs;
