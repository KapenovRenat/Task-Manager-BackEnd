import * as mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, lowercase: true},
    name: {type: String},
    hash: {type: String}
});

userSchema.pre('save',   async function (next: any) {
    (this as any).hash = await bcrypt.hash((this as any).hash, 10);
    next();
});

const User = mongoose.model('User', userSchema);

export default User;
