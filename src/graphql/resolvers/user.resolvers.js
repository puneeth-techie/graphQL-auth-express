import { registerValidate } from "../../utils/validatorSchema.js";
import issueTokens from "../../utils/generateToken.js";
import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";

/** All user related resolvers */
const userResolver = {
  Query: {
    hello: () => {
      return "Hello Auth API.";
    },
  },

  Mutation: {
    registerUser: async (_parent, args, _context, _info) => {
      try {
        /**validate the register schema */
        const { error } = await registerValidate.validateAsync(args.user, {
          abortEarly: false,
        });
        if (error) {
          throw new Error(error);
        } else {
          const { name, email, password } = args.user;
          let user = await User.findOne({ email });
          if (user) {
            throw new Error("Email id already registered.");
          } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            user = new User({
              name,
              email,
              password: hashedPassword,
            });
            await user.save();
            const tokens = issueTokens(user);
            return {
              user,
              ...tokens,
            };
          }
        }
      } catch (error) {
        console.log(`Register schema validation failed: ${error.message}`);
      }
    },
  },
};

export default userResolver;
