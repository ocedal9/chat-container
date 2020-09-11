const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },

    createdAt: {
        type: String,
        required: true,
    },

    roomId: {
        type: String,
        required: true,
    },
});

const roomSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true,
    },

    type: {
        type: String,
        required: true,
    },

    admin: {
        type: String,
        required: true,
    },

    members: [String],

    createdAt: {
        type: String,
        required: true,
    },

    updatedAt: {
        type: String,
        required: true,
    },
});

const userRoomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
    },

    userId: {
        type: String,
        required: true,
    },

    type: {
        type: String,
        required: true,
    },

    joinedAt: {
        type: String,
        required: true,
    },
});

const idbytoken = async (token) => {
    try {
        const decoded = jwt.verify(token, "chattoken");
        // console.log(decoded);
        return decoded._id;
    } catch (e) {
        throw new Error(e, "error");
    }
};

const Message = mongoose.model("Message", messageSchema);
const Room = mongoose.model("Room", roomSchema);
const UserRoom = mongoose.model("UserRoom", userRoomSchema);

module.exports = {
    UserRoom,
    Room,
    Message,
    idbytoken,
};
