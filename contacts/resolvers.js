const { Contacts } = require("./model");
const { ApolloError } = require("apollo-server");
// const { contactsbytoken } = require("./model");
// const user = require("../authentication/models/user");

module.exports = {
    Query: {
        getcontacts: async (parent, input, context) => {
            try {
                const id = context.req.userId;
                // console.log("adsf", id);
                const user = await Contacts.findOne({ userId: id });
                // console.log("asd", user);
                return user.contacts;
            } catch (e) {
                throw new ApolloError("fail to get contacts", 504);
            }
        },
    },

    Mutation: {
        addcontact: async (obj, { input }, { req: { userId } }) => {
            try {
                console.log(input, userId);
                const id = userId;
                const id2 = input.id;
                const userCont = await Contacts.findOne({ userId: id });
                const userCont2 = await Contacts.findOne({ userId: id2 });
                // console.log("primer", userCont, userCont2);
                if (!userCont && !userCont2) {
                    const contarray = [{ id: input.id, nick: input.nick }];
                    const createParams = {
                        userId: id,
                        contacts: contarray,
                    };
                    const contactsMon = new Contacts(createParams);
                    // console.log(contactsMon);
                    await contactsMon.save();
                    console.log(contactsMon);
                    const contarray2 = [{ id: id, nick: input.ownNick }];
                    const createParams2 = {
                        userId: id2,
                        contacts: contarray2,
                    };
                    const contactsMon2 = new Contacts(createParams2);
                    await contactsMon2.save();
                    console.log(contactsMon2);
                    return contactsMon;
                } else if (userCont && userCont2) {
                    const user = await Contacts.findOne({ userId: id });
                    const obj2 = {};
                    obj2.id = input.id;
                    obj2.nick = input.nick;
                    user.contacts.push(obj2);
                    await user.save();

                    const user2 = await Contacts.findOne({ userId: id2 });
                    const obj = {};
                    obj.id = id;
                    obj.nick = input.ownNick;
                    user2.contacts.push(obj);
                    await user2.save();

                    // console.log("ya creado", user, user2);
                    return user;
                } else if (!userCont && userCont2) {
                    const contarray = [{ id: input.id, nick: input.nick }];
                    const createParams = {
                        userId: id,
                        contacts: contarray,
                    };
                    const contactsMon = new Contacts(createParams);
                    // console.log(contactsMon);
                    await contactsMon.save();

                    const user2 = await Contacts.findOne({ userId: id2 });
                    const obj = {};
                    obj.id = id;
                    obj.nick = input.ownNick;
                    user2.contacts.push(obj);
                    await user2.save();
                    // console.log("ya creado", user2);

                    return contactsMon;
                } else if (userCont && !userCont2) {
                    const user = await Contacts.findOne({ userId: id });
                    const obj2 = {};
                    obj2.id = input.id;
                    obj2.nick = input.nick;
                    user.contacts.push(obj2);
                    await user.save();

                    const contarray2 = [{ id: userId, nick: input.ownNick }];
                    const createParams2 = {
                        userId: id2,
                        contacts: contarray2,
                    };
                    const contactsMon2 = new Contacts(createParams2);
                    await contactsMon2.save();

                    return user;
                }
            } catch (e) {
                throw new ApolloError("fail to add contacts", 678);
            }
        },

        createcontact: async (obj, input, context) => {
            try {
                const id = context.req.userId;
                const params = {
                    userId: id,
                    contacts: [],
                };
                const contactsMon = new Contacts(params);
                // console.log(contactsMon);
                await contactsMon.save();
            } catch (e) {
                throw new ApolloError("fail to create contacts", 678);
            }
        },
    },
};
