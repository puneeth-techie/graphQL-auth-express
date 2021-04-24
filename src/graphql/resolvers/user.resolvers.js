/** All user related resolvers */
const userResolver = {
  Query: {
    hello: () => {
      return "Hello User Auth.";
    },
  },
};

export default userResolver;
