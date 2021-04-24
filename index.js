import app from "./src/startup/app.js";
import http from "http";
import startApolloServer from "./src/utils/startApolloServer.js";
import connectDB from "./src/startup/db.js";

/** init server */
const server = http.createServer(app);

/** express and apollo server port */
const port = process.env.PORT || 4000;

/** init apollo server */
startApolloServer();

/** starting express server */
server.listen(port, () => {
  console.log(`Server started listening on port: ${port}`);
});

/** init MongoDB */
connectDB();
