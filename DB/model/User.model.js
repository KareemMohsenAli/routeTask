import  mongoose, { model } from'mongoose';
import { hash } from '../../src/utils/HashAndCompare.js';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password =  hash({plaintext:this.password});
    }
    next();
});

UserSchema.methods.comparePassword = async function (password) {
    return compare({ plaintext: password, hashValue: this.password });  
};

const User = mongoose.models.User|| model( "User", UserSchema )
export default User