import { ApolloServer } from "apollo-server-express";
import userTypeDefs from "../graphql/typedefs/user.typedefs.js";
import userResolver from "../graphql/resolvers/user.resolvers.js";
import app from "../startup/app.js";

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs: [userTypeDefs],
    resolvers: [userResolver],
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
  server.applyMiddleware({ app });
};

export default startApolloServer;
