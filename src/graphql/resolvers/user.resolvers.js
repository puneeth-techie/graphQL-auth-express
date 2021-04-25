import {
  registerValidate,
  loginValidate,
} from "../../utils/validatorSchema.js";
import { issueTokens, getRefreshToken } from "../../utils/generateToken.js";
import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";

/** All user related resolvers */
const userResolver = {
  Query: {
    /** Login user
     * @access  private
     */
    userLogin: async (_parent, args, _context, _info) => {
      /** validate the login info */
      const { error } = await loginValidate.validateAsync(args, {
        abortEarly: true,
      });
      if (error) {
        throw new Error(error);
      } else {
        const { email, password } = args;
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid email. Please register");
        } else {
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
      }
    },
    /** Profile
     * @access  private
     */
    profile: async (_parent, args, context, _info) => {
      if (!context.user) throw new Error("Invalid token. Please login.");
      return context.user;
    },
    /** Refresh Token
     * @access  private
     */
    refreshToken: async (_parent, args, context, _info) => {
      if (!context.user) throw new Error("Invalid token. Please login.");
      const loggedUser = await context.user;
      const tokens = issueTokens(loggedUser);
      return {
        user: loggedUser,
        ...tokens,
      };
    },
    /**All Users List
     * @access  Admin
     */
    usersList: async (_parent, args, context, _info) => {
      if (!context.user)
        throw new Error("Invalid token. Please login as admin.");
      const adminInfo = await context.user;
      if (adminInfo.isAdmin === true) {
        const usersList = await User.find({ isAdmin: false });
        return usersList;
      } else {
        const error = new Error("Admin access required.");
        return error;
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
