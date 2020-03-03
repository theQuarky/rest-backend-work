import * as mongoose from "mongoose";
import * as bcrypt from 'bcrypt';
const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    phone_no: {
        type: Number
    },
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    pin_code: {
        type: Number
    }
});

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}
UserSchema.set('autoIndex', true)
export default mongoose.model('users', UserSchema);
