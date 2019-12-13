const leaveChatRoom = (socket, id) => {
    socket.leave(id);
}

module.exports = leaveChatRoom;