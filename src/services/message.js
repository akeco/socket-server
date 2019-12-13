const messagesModel = require('../models/messages');

const message = async (io, senderSocketID, data) => {
    const { sender, receiver } = data;
    let result = null;

    try {
        result = await messagesModel.findOne({ users: { "$all" : [sender.id, receiver.id]} });

        if (result) {
            result.messages = [...result.messages, data];
            result = await result.save();
        }
        else {
            result = await messagesModel.create({ users: [sender.id, receiver.id], messages: [data] });
        }
    }
    catch (e) {
        return e;
    }

    io.to(receiver.socketID).emit('receive_message', result.messages[result.messages.length - 1]);
    io.to(senderSocketID).emit('receive_message', result.messages[result.messages.length - 1]);
};

module.exports = message;