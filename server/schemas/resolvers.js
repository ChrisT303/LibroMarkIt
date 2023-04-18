import { AuthenticationError } from "apollo-server-errors";
import { User, Book } from "../models";
import authService from "../utils/auth";

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = authService.signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = authService.signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { input }, context) => {
      const token = context.req.headers.authorization.split(" ").pop();
      const user = authService.verifyToken(token);

      if (user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: user._id },
          {
            $addToSet: { savedBooks: input },
          },
          { new: true, runValidators: true }
        ).populate("savedBooks");

        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in first.");
    },

    removeBook: async (parent, { bookId }, context) => {
      const token = context.req.headers.authorization.split(" ").pop();
      const user = authService.verifyToken(token);

      if (user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        if (!updatedUser) {
          console.log("Could not find user");
        }
        return updatedUser;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
};

export default resolvers;
