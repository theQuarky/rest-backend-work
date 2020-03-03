import * as mongoose from "mongoose";

let ObjectId = mongoose.Types.ObjectId;

const OrderSchema = new mongoose.Schema({
    user_id: {
        type: ObjectId
    },
    product_id: {
        type: ObjectId
    }
});
OrderSchema.set('autoIndex', true)
export default mongoose.model('orders', OrderSchema);
