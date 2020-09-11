const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
var app = require("express")();
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");
// var { createProxyMiddleware } = require("http-proxy-middleware");
// const { userbytoken } = require("../authentication/models/user");
const port = 4000;
class AuthenticatedDataSource extends RemoteGraphQLDataSource {
    willSendRequest({ request, context }) {
        // console.log(context.authorization, "hhh");
        request.http.headers.set("auth", context.token);
        // console.log(request.http.headers);
    }
    didReceiveResponse({ response, request, context }) {
        const cookie = response.http.headers.get("set-cookie");
        // console.log(cookie);
        // const ca = cookie.split(";");
        // console.log(ca);

        if (cookie) {
            const ca = cookie.split(";");
            const jwtoken = ca[0];
            const tok = jwtoken.split("=");
            const token = tok[1];
            // console.log(token);
            context.res.cookie("token", token, {
                // httpOnly: true,
                // secure: false,
                maxAge: 1000 * 60 * 60 * 24 * 365,
                sameSite: "lax",
            });
        }
        // console.log(response.http.headers);
        return response;
    }
}

const gateway = new ApolloGateway({
    serviceList: [
        { name: "authentication", url: "http://authentication:4001/graphql" },
        { name: "contacts", url: "http://contacts:4002/graphql" },
        { name: "notifications", url: "http://notifications:4003/graphql" },
        { name: "conversations", url: "http://conversations:4004/graphql" },
    ],
    buildService({ url }) {
        return new AuthenticatedDataSource({ url });
    },
});

var corsOptions = {
    // origin: true,
    origin: ["http://localhost:8000"],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const server = new ApolloServer({
    gateway,
    subscriptions: false,
    context: ({ res, req }) => {
        // console.log("gateway");
        res.header("Access-Control-Allow-Origin", "http://localhost:8000");
        const token = req.headers.authorization || "";

        return { req, res, token };
    },
});

server.applyMiddleware({ app });
app.listen({ port }, () => console.log(`🚀 GATEWAY ready at http://localhost:4000${server.graphqlPath}`));
