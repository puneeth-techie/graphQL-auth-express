const userResolver = {
  Query: {
    hello: () => {
      return "Hello User Auth.";
    },
  },
};

export default userResolver;
