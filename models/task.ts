import * as mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    name: {type: String, required: true},
    project_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: ''},
    status_id: {type: Number, default: 0}
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;
