import * as mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, lowercase: true},
    name: {type: String},
    hash: {type: String},
    isActivate: {type: Boolean, default: false}
});

userSchema.pre('save',   async function (next: any) {
    (this as any).hash = await bcrypt.hash((this as any).hash, 10);
    next();
});

userSchema.methods.checkPassword = function(password: string) {
    return bcrypt.compareSync(password, this.hash);
};

userSchema.methods.createToken = async function() {
    return await jwt.sign({
        data: {_id: this._id, name: this.name}
    }, 'manager');
};

const User = mongoose.model('User', userSchema);

export default User;

