require("./mongoose");
const { ApolloServer } = require("apollo-server-express");
const { buildFederatedSchema } = require("@apollo/federation");
const cors = require("cors");
const app = require("express")();
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { idbytoken } = require("./model");
const port = 4003;

var http = require("http").createServer(app);
var io = require("socket.io")(http, { path: "/notisock/socket.io" });
io.of("/notisock").on("connection", (socketn) => {
    socketn.on("disconnect", () => {
        console.log("user disconnected");
    });
    socketn.on("createroom", (msg) => {
        // console.log(msg);
        socketn.join(msg, () => {
            // const room = Object.keys(socketn.rooms);
            // console.log("single room", room);
        });
    });
    socketn.on("accepted", (msg) => {
        // console.log("friend socjet", msg);
        io.of("/notisock").to(msg.roomId).emit("addcon", msg);
    });
    socketn.on("roomsocket", (msg) => {
        // console.log("ROOM socket", msg);
        io.of("/notisock").to(msg.roomToJoin).emit("addroom", msg);
    });
    socketn.on("grouproom", (msg) => {
        // console.log("in group RRROOO<M", msg.members);
        for (const member of msg.members) {
            io.of("/notisock").to(member).emit("newgroup", msg);
        }
    });
    socketn.on("adduser", (msg) => {
        // console.log("in server", msg);
        socketn.broadcast.emit("broadcast", msg);
    });
});

var corsOptions = {
    // origin: true,
    origin: ["http://659df2aa-default-ingress-e8c7-583114532.us-east-1.elb.amazonaws.com/graphq"],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    path: "/noti/graphql",
    context: async ({ res, req }) => {
        // console.log(req);
        res.header("Access-Control-Allow-Origin", "http://659df2aa-default-ingress-e8c7-583114532.us-east-1.elb.amazonaws.com/graphq");

        const tokenBearer = req.headers.auth || "";
        const token = tokenBearer.split(" ")[1];

        // console.log(token);
        if (token) {
            const userId = await idbytoken(token);
            req.userId = userId;
            req.token = token;
            // console.log(userId);
        }
        // console.log(res);
        return { req, res, io };
    },
});

server.applyMiddleware({ app });
// app.listen({ port }, () => console.log(`🚀 NOTIFICATIONS ready at http://localhost:4003${server.graphqlPath}`));
http.listen({ port }, () => console.log(`🚀 NOTIFICATIONS ready at http://localhost:4003${server.graphqlPath}`));

// module.exports = io;
