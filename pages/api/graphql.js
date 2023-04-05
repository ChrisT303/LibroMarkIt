import { ApolloServer } from 'apollo-server-micro';
import { authMiddleware } from '../../server/utils/auth';
import { typeDefs, resolvers } from '../../server/schemas';
import db from '../../server/config/connection';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const context = await authMiddleware(req);
    return context;
  },
});

const startServer = server.start();

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;
  await db.once('open', () => {
    console.log(`Connected to the database.`);
  });

  return server.createHandler({ path: '/api/graphql' })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

