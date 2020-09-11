require("./mongoose");
const { ApolloServer } = require("apollo-server-express");
const { buildFederatedSchema } = require("@apollo/federation");
const cors = require("cors");
const app = require("express")();
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { userbytoken } = require("./models/user");
// const httpHeadersPlugin = require("apollo-server-plugin-http-headers");
const port = 4001;

var corsOptions = {
    // origin: true,
    origin: ["http://localhost:4000"],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    // plugins: [httpHeadersPlugin],
    context: async ({ res, req }) => {
        // console.log("in auth context");

        res.header("Access-Control-Allow-Origin", "http://localhost:4000");

        const tokenBearer = req.headers.auth || "";
        // console.log(req.headers.auth);
        const token = tokenBearer.split(" ")[1];
        // res.header("set-cookie");
        // console.log(token);
        // console.log();
        if (token) {
            // console.log("si hay token", token);
            const user = await userbytoken(token);
            req.user = user;
            req.token = token;

            // console.log("si encontro usuario", req.user.nickname);
        }
        // console.log(res);
        return {
            req,
            res,
            // setCookies: new Array(),
            // setHeaders: new Array(),
        };
    },
});

server.applyMiddleware({ app });
app.listen({ port }, () => console.log(`🚀 AUTHENTICATION ready at http://localhost:4001${server.graphqlPath}`));
