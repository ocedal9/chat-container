const mongoose = require("mongoose");

mongoose.connect("mongodb://mongoauth-service/chat-app", {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
}).then(db => console.log("Db is conected to", db.connection.host)).catch (console.log) ;
