import * as mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    url_avatar: {type: String},
    isPrivate: {type: Boolean, default: false},
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
