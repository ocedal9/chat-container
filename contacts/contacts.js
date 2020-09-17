require("./mongoose");
const { ApolloServer } = require("apollo-server-express");
const { buildFederatedSchema } = require("@apollo/federation");
const cors = require("cors");
const app = require("express")();
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { contactsbytoken } = require("./model");
const port = 4002;

var corsOptions = {
    // origin: true,
    origin: ["http://659df2aa-default-ingress-e8c7-583114532.us-east-1.elb.amazonaws.com/graphql"],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    path: "/cont/graphql",
    context: async ({ res, req }) => {
        // console.log(req);
        res.header("Access-Control-Allow-Origin", "http://659df2aa-default-ingress-e8c7-583114532.us-east-1.elb.amazonaws.com/graphq");

        const tokenBearer = req.headers.auth || "";
        const token = tokenBearer.split(" ")[1];

        // console.log("token = ", token);
        if (token) {
            const userId = await contactsbytoken(token);
            req.userId = userId;
            req.token = token;
            // console.log(userId, "asd");
        }
        console.log("in contact context", req.userId);
        return { req, res };
    },
});

server.applyMiddleware({ app });
app.listen({ port }, () => console.log(`🚀 Contacts ready at http://localhost:4002${server.graphqlPath}`));
