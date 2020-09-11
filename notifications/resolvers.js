const { Noti } = require("./model");
const { ApolloError } = require("apollo-server");
// const io = require("./notifications");

module.exports = {
    Query: {
        getnotis: async (parent, input, context) => {
            try {
                const id = context.req.userId;
                // console.log(id);
                const userNoti = await Noti.find({ target: id });
                // console.log(userNoti);
                return userNoti;
            } catch (e) {
                throw new ApolloError("fail to get notis", 877);
            }
        },
    },

    Mutation: {
        friendreq: async (obj, { input }, { io }) => {
            // console.log("in mutation");
            try {
                // const id = context.req.id;
                // console.log("input en el resolver", input);
                const notification = {
                    emisor: input.emisor,
                    target: input.target,
                    notitype: input.notitype,
                    status: input.status,
                    emisorId: input.emisorId,
                };
                const Notification = new Noti(notification);
                await Notification.save();
                const { _id, ...noti } = { ...Notification._doc };
                noti.id = Notification.id;

                // const emisorId = userId;
                // console.log(noti, emisorId);

                io.of("/notisock").to(input.target).emit("reqserver", noti);
                return Notification;
            } catch (e) {
                throw new ApolloError("fail no create notification", 555);
            }
        },

        deleteNoti: async (obj, { input }) => {
            // console.log("indelete");
            try {
                // console.log("asdfdfs", input.id);
                await Noti.deleteOne({ _id: input.id });
                // console.log("noti deleted");
            } catch (e) {
                throw new ApolloError("fail to delete noti", 777);
            }
        },
    },
};
