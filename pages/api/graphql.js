import { ApolloServer } from "apollo-server-micro";
import { typeDefs, resolvers } from "../../server/schemas";
import dbConnect from "../../server/utils/dbConnect"; // <-- Make sure you import dbConnect
import AuthService from "../../server/utils/auth";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    if (!req.headers) {
      console.warn("Request has no headers, skipping context.");
      return {};
    }
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ").pop()
      : "";
    const user = AuthService.verifyToken(token);
    return { req, user };
  },
});

const startServer = server.start();

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await dbConnect(); // <-- Use the dbConnect function here
  console.log("Server is starting up...");

  return server.createHandler({ path: "/api/graphql" })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
