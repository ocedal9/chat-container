const { User } = require("./models/user");
const { ApolloError } = require("apollo-server");

module.exports = {
    Query: {
        getuser: async (parent, { input }, context) => {
            try {
                // console.log("in getuser resolver");
                const user = await User.findOne({ nickname: context.req.user.nickname });
                // console.log("in user resolver", user.id);

                return user;
            } catch (e) {
                throw new ApolloError("user not found", 504);
            }
        },
        getallusers: async () => {
            try {
                const users = await User.find();
                // console.log(context.req.user);
                // console.log(context.req.token);

                return users;
            } catch (e) {
                throw new ApolloError("no users", 504);
            }
        },
        getusersbyemail: async (parent, { input }) => {
            try {
                const users = await User.find(input);
                return users;
            } catch (e) {
                throw new ApolloError("no users", 504);
            }
        },
    },

    Mutation: {
        newUser: async (obj, { input }, context) => {
            // console.log(input);

            try {
                const user = new User(input);
                // console.log(user);
                await user.save();
                // console.log("ff");
                const token = await user.generateAuthToken();
                // console.log("asdf", user);

                context.res.cookie("token", token, {
                    maxAge: 1000 * 60 * 60 * 24 * 365,
                    sameSite: "lax",
                });
                return user;
            } catch (e) {
                throw new ApolloError("not able to save", 404);
            }
        },

        login: async (obj, { input }, context) => {
            try {
                // console.log("en resolver", context.req.token);
                const user = await User.findByCredentials(input.email, input.password);
                const token = await user.generateAuthToken();
               
                context.res.cookie("token", token, {
                    // httpOnly: true,
                    // secure: false,
                    maxAge: 1000 * 60 * 60 * 24 * 365,
                    sameSite: "lax",
                });
                return user;
            } catch (e) {
                throw new ApolloError("wrong email or password", 404);
            }
        },

        logout: async (obj, args, context) => {
            try {
                const user = context.req.user;
                user.tokens = user.tokens.filter((token) => {
                    return token.token !== context.req.token;
                });
                await user.save();
                context.res.cookie("token", "");
                // console.log("@@ Saved on Data Base!!");
                // console.log("in user resolver", user.id);

                // return user;
            } catch (e) {
                throw new ApolloError("fail logout", 888);
            }
        },

        logoutall: async (obj, args, context) => {
            try {
                const user = context.req.user;
                user.tokens = [];
                await user.save();
                // console.log("@@ Saved on Data Base!!");
                return user;
            } catch (e) {
                throw new ApolloError("fail logoutall", 888);
            }
        },

      
    },
};
