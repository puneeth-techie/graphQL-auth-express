import {
  registerValidate,
  loginValidate,
} from "../../utils/validatorSchema.js";
import issueTokens from "../../utils/generateToken.js";
import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";

/** All user related resolvers */
const userResolver = {
  Query: {
    /** Login user */
    userLogin: async (_parent, args, _context, _info) => {
      /** validate the login info */
      const { error } = await loginValidate.validateAsync(args, {
        abortEarly: true,
      });
      if (error) {
        throw new Error("Email does not exist. Please register");
      } else {
        const { email, password } = args;
        const user = await User.findOne({ email });
        const verifyPassword = await bcrypt.compare(password, user.password);
        if (verifyPassword) {
          const tokens = issueTokens(user);
          return {
            user,
            ...tokens,
          };
        } else {
          throw new Error("Incorrect password.");
        }
      }
    },
  },

  Mutation: {
    /** Register new user. */
    registerUser: async (_parent, args, _context, _info) => {
      try {
        /**validate the register schema */
        const { error } = await registerValidate.validateAsync(args.user, {
          abortEarly: true,
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
