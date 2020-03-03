import * as mongoose from "mongoose";

export default interface IUser extends mongoose.Document {
    _id: any;
    password?: string;
}