import { gql } from "apollo-server-express";

const userTypeDefs = gql`
  type Query {
    hello: String
  }
`;

export default userTypeDefs;
