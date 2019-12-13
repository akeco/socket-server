const connectionModel = require('../models/connection');

const getSocketId = async (io, socket, userID) => {
   try {
        if (userID) {
            const result = await connectionModel.findOne({ userID });

            socket.join(userID);
            io.to(`${socket.id}`).emit('receive_contact_socket', result);
        }
   }
   catch (e) {
       console.log("ER", e);
   }
};

module.exports = getSocketId;