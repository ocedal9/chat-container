const mongoose = require("mongoose");

mongoose.connect("mongodb://mongoConv:27017/chat-app", {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
}).then(db => console.log("Db is conected to", db.connection.host));