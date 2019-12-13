const connectionModel = require('../models/connection');

const disconnect = async (socket) => {
    try {
        await connectionModel.deleteOne({ socketID: socket.id });
    }
    catch (e) {
        //
    }
}

module.exports = disconnect;