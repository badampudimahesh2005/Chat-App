import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
    sender:{
        type: Schema.Types.ObjectId,
         ref: 'Users',
        required: true
    },
    receiver:{
        type: Schema.Types.ObjectId, 
        ref: 'Users',
        required: false,
    },
    messageType:{
        type: String,
        enum: ['text', 'file'],
        required: true,
    },
    content:{
        type: String,
        required: function(){
            return this.messageType === 'text';
        },
    },
    fileUrl:{
        type: String,
        required: function(){
            return this.messageType === 'file';
        }
        },
    timestamp:{
        type: Date,
        default: Date.now,
    },
    
});

const Message = mongoose.model('Message', messagesSchema);
export default Message;