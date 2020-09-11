const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const contactSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    contacts: [
        {
            id: {
                type: String,
                required: true,
            },

            nick: {
                type: String,
                required: true,
            },
        },
    ],
});

const contactsbytoken = (token) => {
    // try {
    // console.log(token);
    const decoded = jwt.verify(token, "chattoken");
    const userId = decoded._id;
    // console.log(decoded._id);
    return userId;
    // } catch (e) {
    // throw new Error(e, "error");
};

const Contacts = mongoose.model("Contacts", contactSchema);

module.exports = {
    Contacts,
    contactsbytoken,
};
