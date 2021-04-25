import { ApolloServer } from "apollo-server-express";
import userTypeDefs from "../graphql/typedefs/user.typedefs.js";
import userResolver from "../graphql/resolvers/user.resolvers.js";
import { getUser } from "../utils/generateToken.js";
import app from "../startup/app.js";

/** starting apollo server */
const startApolloServer = async () => {
  /** instantiating ApolloServer object */
  const server = new ApolloServer({
    typeDefs: [userTypeDefs],
    resolvers: [userResolver],
    context: ({ req }) => {
      /** getting user token */
      const token = req.headers.authorization || "";
      const user = getUser(token);
      if (!user) throw new Error("You must be logged in.");
      return { user };
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
