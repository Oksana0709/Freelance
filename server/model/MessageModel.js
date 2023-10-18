const mongoose = require('mongoose');
const { Schema } = mongoose;


const messageScheme = new Schema(
    {
        id: Number,
        senderId: Number,
        chatId: Number,
        dateTime: { type: Date, default: Date.now },
        content: String,
    },
    { versionKey: false }
);

const Message = mongoose.model('Message', messageScheme);

module.exports = Message;
