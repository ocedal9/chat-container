const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const notiSchema = new mongoose.Schema({
    emisor: {
        type: String,
        required: true,
    },

    emisorId: {
        type: String,
        required: true,
    },

    target: {
        type: String,
        required: true,
    },

    notitype: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});

const idbytoken = async (token) => {
    try {
        const decoded = jwt.verify(token, "chattoken");
        return decoded._id;
    } catch (e) {
        throw new Error(e, "error");
    }
};

const Noti = mongoose.model("Noti", notiSchema);

module.exports = {
    Noti,
    idbytoken,
};
