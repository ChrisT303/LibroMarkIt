import { gql } from 'apollo-server-micro';

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Auth {
    token: ID!
    user: User
  }
  type Book {
    bookId: String!
    authors: [String]
    title: String!
    description: String
    image: String
    link: String
  }
  input SaveBookInput {
    bookId: String
    authors: [String]
    title: String
    description: String
    image: String
    link: String
  }
  type Query {
    me: User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: SaveBookInput): User
    removeBook(bookId: String!): User
  }
`;

export default typeDefs;
