const mongoose = require("mongoose");

mongoose.connect("mongodb://mongoauth:27017/chat-app", {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
}).then(db => console.log("Db is conected to", db.connection.host)).catch (console.log) ;
