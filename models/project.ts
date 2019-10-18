import bcrypt from "bcrypt";
import * as mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    url_avatar: {type: String},
    hash: {type: String},
    isPrivate: {type: Boolean, default: false}
});

projectSchema.pre('save',   async function (next: any) {
    (this as any).hash ?
        (this as any).hash = await bcrypt.hash((this as any).hash, 10) :
        (this as any).hash = '';
    next();
});


const Project = mongoose.model('Project', projectSchema);

export default Project;
