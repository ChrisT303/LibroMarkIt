import { ApolloServer } from "apollo-server-micro";
import { typeDefs, resolvers } from "../../server/schemas";
import db from "../../server/config/connections";
import AuthService from "../../server/utils/auth";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ").pop()
      : "";
    const user = AuthService.verifyToken(token);
    return { user };
  },
});

const startServer = server.start();

export default async function handler(req, res) {

  console.log("Request received:", req.method, req.url); 

  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await db.once("open", () => {
    console.log(`Connected to the database.`);
  });
  console.log('Server is starting up...');

  return server.createHandler({ path: "/api/graphql" })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
