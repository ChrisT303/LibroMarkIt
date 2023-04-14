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
    console.log("Request headers:", req.headers);
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ").pop()
      : "";
    console.log("Token:", token);
    const user = AuthService.verifyToken(token);
    console.log("User:", user);
    return { req, user };
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
  await dbConnect(); // <-- Use the dbConnect function here
  console.log("Server is starting up...");

  return server.createHandler({ path: "/api/graphql" })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
