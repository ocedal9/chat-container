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
var io = require("socket.io")(http);
io.on("connection", (socket) => {
    // console.log(`${socket.id} has join`);
    socket.on("disconnect", () => {
        // console.log("user disconnected");
    });
    socket.on("roomsReq", async (msg) => {
        const id = msg;
        // console.log("idbytoken", id);
        // console.log("id desde socket", msg);
        const roomsObj = await UserRoom.find({ userId: id });
        // console.log("roonssssssObj", roomsObj);
        const roomsArray = [];
        for (const roomObj of roomsObj) {
            roomsArray.push(roomObj.roomId);
        }
        // console.log("rooms array de ids", roomsArray);
        socket.join(roomsArray, () => {
            const rooms = Object.keys(socket.rooms);
            // console.log("room in join", rooms);
            // io.to("5f4846c7c7b46f0af76dd022").emit("msgfromserver", `conected to room`);
        });
        // io.to("5f4846c7c7b46f0af76dd022").emit("a", "desde room");
    });
    socket.on("message", (msg) => {
        // console.log("onmessage", msg.msg.roomId);
        io.to(msg.msg.roomId).emit("msgserver", msg.msg);
        // socket.emit("msgserver", msg.msg);
    });
    // socket.on("grouproom", (msg) => {
    //     console.log("in group RRROOO<M", msg.id);
    //     io.to(msg.id).emit("newgroup", msg);
    // });
});

var corsOptions = {
    // origin: true,
    origin: ["http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const server = new ApolloServer({
    // path: "/conversations/graphql",
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    context: async ({ res, req }) => {
        // console.log("request room");
        res.header("Access-Control-Allow-Origin", "http://localhost:4000");
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
