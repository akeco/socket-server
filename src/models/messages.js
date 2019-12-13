const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ 
        message: String,
        createdAt: {
            type: Date,
            default: Date.now
        },
        sender: { 
            id: Schema.Types.ObjectId,
            name: String
        },
        receiver: { 
            id: Schema.Types.ObjectId,
            name: String
        }
    }]
  });

  module.exports = mongoose.model('Messages', messagesSchema);
