import * as mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String
    },
    type: {
        type: String
    },
    sub_type: {
        type: String
    },
    price: {
        type: Number
    },
    img_path: {
        type: String
    },
    available: {
        type: Boolean
    }
});
ProductSchema.set('autoIndex', true)
export default mongoose.model('products', ProductSchema);
