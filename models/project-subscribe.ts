import { USER_STATUS } from "../configuration";
import * as mongoose from 'mongoose';

const projectSubscribeSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    user_status: {type: Number, default: USER_STATUS.ADMIN},
    project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
});

const ProjectSubscribe = mongoose.model('ProjectSubscribe', projectSubscribeSchema);

export default ProjectSubscribe;
