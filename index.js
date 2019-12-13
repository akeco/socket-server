const app = require('express')();
const mongoose = require('mongoose');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
require('dotenv').config();
PORT = process.env.PORT || 8000;

mongoose.set('useFindAndModify', false);
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DATABASE}`,{ useNewUrlParser : true, useUnifiedTopology: true })
.then(() => console.log('DB Connected!'))
.catch(err => {
    console.log(err);
});

const message = require('./src/services/message');
const disconnect = require('./src/services/disconnect');
const connect = require('./src/services/connect');
const getSocketId = require('./src/services/getSocketId');
const getMessagesHistory = require('./src/services/getMessagesHistory');
const leaveChatRoom = require('./src/services/leaveChatRoom'); 

io.on('connection', (socket) => {
    connect(socket);
    socket.on('message', (data) => message(io, socket.id, data));
    socket.on('leave_chat_room', (id) => leaveChatRoom(socket, id));
    socket.on('disconnect', () => disconnect(socket));
    socket.on('get_socket_id', (userID) => getSocketId(io, socket, userID));
    socket.on('get_messages_history', (userIdList) => getMessagesHistory(io, socket.id, userIdList));
});

http.listen(PORT, () => {
  console.log('listening on ' + PORT);
});