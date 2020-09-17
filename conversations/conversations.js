require("./mongoose");
const { ApolloServer } = require("apollo-server-express");
const { buildFederatedSchema } = require("@apollo/federation");
const cors = require("cors");
const app = require("express")();
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { idbytoken } = require("./model");
const port = 4004;
const { UserRoom } = require("./model");

var http = require("http").createServer(app);
var io = require("socket.io")(http, {path: "/convsock/socket.io"});
io.of("/convsock").on("connection", (socket) => {
    socket.on("disconnect", () => {
    });
    socket.on("roomsReq", async (msg) => {
        const id = msg;
        const roomsObj = await UserRoom.find({ userId: id });
        const roomsArray = [];
        for (const roomObj of roomsObj) {
            roomsArray.push(roomObj.roomId);
        }
        socket.join(roomsArray, () => {
            const rooms = Object.keys(socket.rooms);
        });
    });
    socket.on("message", (msg) => {
        io.of("/convsock").to(msg.msg.roomId).emit("msgserver", msg.msg);
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
    // path: "/conversations/graphql",
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    path: "/conv/graphql",
    context: async ({ res, req }) => {
        // console.log("request room");
        res.header("Access-Control-Allow-Origin", "http://659df2aa-default-ingress-e8c7-583114532.us-east-1.elb.amazonaws.com/graphq");
        const tokenBearer = req.headers.auth || "";
        const tok = tokenBearer.split(" ")[1];
        // console.log(tok);
        if (tok) {
            const id = await idbytoken(tok);
            req.id = id;
            req.tok = tok;
        }
        // console.log("in conv context");
        return { req, res };
    },
});

// console.log(roomsObj);

server.applyMiddleware({ app });
http.listen({ port }, () => console.log(`🚀 CONVERSATIONS ready at http://localhost:4004${server.graphqlPath}`));
