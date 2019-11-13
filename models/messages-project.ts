import * as mongoose from 'mongoose';

const messagesSchema = new mongoose.Schema({
    email: {type: String},
    project_id: {type: String},
    message: {type: String},
    type: {type: Number},
});

const Message = mongoose.model('Messages', messagesSchema);

export default Message;
