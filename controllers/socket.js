const User = require("../models/user");
const Message = require("../models/message");

const userConnect = async (uid = "") => {

    const user = await User.findById(uid);
    user.online = true;

    await user.save();

    return user;

}
const userDisconnect = async (uid = "") => {

    const user = await User.findById(uid);
    user.online = false;

    await user.save();

    return user;

}

const saveMessage = async (payload) => {
    /*
    payload: {
        from:'',
        to:'',
        message:''
    }
    */
    try {
        const message = await Message(payload);
        await message.save();
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    userConnect,
    userDisconnect,
    saveMessage
}