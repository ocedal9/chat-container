const { Room, Message, UserRoom } = require("./model");
const { ApolloError } = require("apollo-server");
// const { io } = require('./conversations');
// let roomsObj = "";

module.exports = {
    Query: {
        listRooms: async (obj, { input }, context) => {
            try {
                // console.log("listRooms query context.id", context.req.id);
                const roomsObj = await UserRoom.find({ userId: context.req.id });
                // console.log("rooms object", roomsObj);
                const roomsArray = [];
                const roomsObjArray = [];
                for (const roomObj of roomsObj) {
                    roomsArray.push(roomObj.roomId);
                    const convObj = await Room.findOne({ _id: roomObj.roomId });
                    // const convRe = {};
                    // convRe.id = convObj[0]._id.toString();
                    // convRe.title = convObj[0].title;
                    // convRe.type = convObj[0].type;
                    // convRe.admin = convObj[0].admin;
                    // convRe.members = convObj[0].members;
                    // convRe.createdAt = convObj[0].createdAt;
                    // convRe.updatedAt = convObj[0].updatedAt;
                    // console.log(convObj);
                    roomsObjArray.push(convObj);
                }
                // console.log(roomsObjArray);

                return roomsObjArray;
            } catch (e) {
                throw new ApolloError("no rooms list", 333);
            }
        },
    },

    Mutation: {
        getMessages: async (obj, { input }) => {
            // console.log("in get messages resolver", input);
            try {
                const messArray = await Message.find({ roomId: input.roomId });
                // console.log("qwer", messArray);
                return messArray;
            } catch (e) {
                throw new ApolloError("no messages", 4444);
            }
        },
        createRoom: async (obj, { input }, context) => {
            // console.log("room");
            try {
                const room = new Room(input);
                await room.save();
                // console.log(room);
                for (const member of room.members) {
                    const uRoom = {};
                    uRoom.roomId = room._id;
                    uRoom.userId = member;
                    uRoom.type = room.type;
                    const date = new Date();
                    uRoom.joinedAt = date.toString();
                    const userRoom = new UserRoom(uRoom);
                    await userRoom.save();
                    // console.log(room);
                }
                return room;
            } catch (e) {
                throw new ApolloError("no room created", 506);
            }
        },

        createMessage: async (obj, { input }, context) => {
            // console.log("in conv resolver");
            try {
                const message = new Message(input);
                // console.log(message);
                await message.save();
                return message;
            } catch (e) {
                throw new ApolloError("no message created", 506);
            }
        },
    },
};
