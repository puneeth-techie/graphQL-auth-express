import { ApolloServer } from "apollo-server-express";
import userTypeDefs from "../graphql/typedefs/user.typedefs.js";
import userResolver from "../graphql/resolvers/user.resolvers.js";
import { getUser, getRefreshToken } from "../utils/generateToken.js";
import app from "../startup/app.js";

/** starting apollo server */
const startApolloServer = async () => {
  /** instantiating ApolloServer object */
  const server = new ApolloServer({
    typeDefs: [userTypeDefs],
    resolvers: [userResolver],
    context: ({ req }) => {
      /** getting user token */
      const token = req.headers.authorization;
      const rToken = req.headers.refresh_token;
      if (token) {
        const user = getUser(token);
        if (!user) throw new Error("You must be logged in.");
        return { user };
      } else if (rToken) {
        const user = getRefreshToken(rToken);
        if (!user) throw new Error("You must be logged in.");
        return { user };
      } else {
        const error = new Error("No headers found.");
        return error;
      }
    },
    playground:
      process.env.NODE_ENV !== "development"
        ? false
        : {
            settings: {
              "request.credentials": "include",
            },
          },
  });
  await server.start();

  /** providing express middleware */
  server.applyMiddleware({ app });
};

export default startApolloServer;
