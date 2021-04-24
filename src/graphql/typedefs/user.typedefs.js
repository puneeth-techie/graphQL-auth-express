import { gql } from "apollo-server-express";

/** All user related typeDefs */
const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Auth {
    user: User
    accessToken: String
    refreshToken: String
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type Query {
    userLogin(email: String!, password: String!): Auth!
  }
  type Mutation {
    registerUser(user: UserInput): Auth!
  }
`;

export default userTypeDefs;
