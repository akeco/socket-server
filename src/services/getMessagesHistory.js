const messagesModel = require('../models/messages');

const getMessagesHistory = async (io, socketID, userIdList) => {
    try {
        const result = await messagesModel.findOne({ users: { "$all" : userIdList} }, { messages: 1, _id: 0 });

        io.to(socketID).emit('receive_messages_history', result.messages);
    }
    catch (e) {
        io.to(socketID).emit('receive_messages_history', []);
    }
};

module.exports = getMessagesHistory;