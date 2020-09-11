const mongoose = require("mongoose");
// const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        // validate(value) {
        //     if (!validator.isEmail(value)) {
        //         throw new Error("email is invalid");
        //     }
        // },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("password cand contain word password");
            }
        },
    },

    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

const userbytoken = async (token) => {
    try {
        const decoded = jwt.verify(token, "chattoken");
        // console.log(decoded);
        const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

        if (!user) {
            throw new Error("auth please");
        }
        // console.log(user);
        return user;
    } catch (e) {
        throw new Error(e, "error");
    }
};

const validateToken = async (token) => {
    try {
        const decoded = jwt.verify(token, "chattoken");
        const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

        if (!user) {
            throw new Error("auth please");
        }
        return true;
    } catch (e) {
        throw new Error(e, "error");
    }
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, "chattoken");
    // user.token = token; ////////eliminar!!!!!!!!!!!!!!!!!!!!!!!!!!
    user.tokens = user.tokens.concat({ token: token });
    await user.save();
    console.log("@@ Saved on Data Base!!");
    // console.log(token);
    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("unable to login");
    }

    return user;
};

userSchema.statics.findByEmail = async (email) => {
    const user = await User.findOne({ email }).select("-contacts -tokens -password");

    if (!user) {
        throw new Error("Unable to find");
    }

    return user;
};

userSchema.pre("save", async function (next) {
    const user = this;

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = {
    User,
    userbytoken,
    validateToken,
};
