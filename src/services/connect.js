const connectionModel = require('../models/connection');

const connect = async (socket) => {
    const userID = socket.handshake.query.id;

    try {
        const user = await connectionModel.findOneAndUpdate({ userID }, { socketID: socket.id });

        if (!user) {
            await connectionModel.create({ socketID: socket.id, userID });
            socket.to(userID).emit('changed_socket_id', { userID, socketID: socket.id });
        }
    }
    catch (e) {
        console.log("ERR");
    }
};

module.exports = connect;