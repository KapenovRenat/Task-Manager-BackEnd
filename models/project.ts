import * as mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

projectSchema.pre('save',   async function (next: any) {

});


const Project = mongoose.model('Project', projectSchema);

export default Project;
