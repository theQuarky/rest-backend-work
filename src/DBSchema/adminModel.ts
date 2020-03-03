import * as mongoose from "mongoose";
import * as bcrypt from 'bcrypt';
const AdminSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
});

AdminSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

AdminSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

AdminSchema.set('autoIndex', true);

export default mongoose.model('AdminSchema', AdminSchema);
