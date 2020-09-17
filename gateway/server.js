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
        { name: "authentication", url: "http://authentication-cluster-ip-service:4001/auth/graphql" },
        { name: "contacts", url: "http://contacts-cluster-ip-service:4002/cont/graphql" },
        { name: "notifications", url: "http://notifications-cluster-ip-service:4003/noti/graphql" },
        { name: "conversations", url: "http://conversations-cluster-ip-service:4004/conv/graphql" },
    ],
    buildService({ url }) {
        return new AuthenticatedDataSource({ url });
    },
});

var corsOptions = {
    // origin: true,
    origin: ["http://659df2aa-default-ingress-e8c7-583114532.us-east-1.elb.amazonaws.com/graphql"],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const server = new ApolloServer({
    gateway,
    subscriptions: false,
    context: ({ res, req }) => {
        // console.log("gateway");
        res.header("Access-Control-Allow-Origin", "http://659df2aa-default-ingress-e8c7-583114532.us-east-1.elb.amazonaws.com/graphql");
        const token = req.headers.authorization || "";

        return { req, res, token };
    },
});

server.applyMiddleware({ app });
app.listen({ port }, () => console.log(`🚀 GATEWAY ready at http://localhost:4000${server.graphqlPath}`));
