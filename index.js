import app from "./src/startup/app.js";
import http from "http";
import startApolloServer from "./src/utils/startApolloServer.js";

const server = http.createServer(app);
const port = process.env.PORT || 4000;

startApolloServer();

server.listen(port, () => {
  console.log(`Server started listening on port: ${port}`);
});
