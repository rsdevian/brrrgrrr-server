import mongoose from "mongoose";
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    orders: [{
        name: {
            type: String,
            required: true
        }
    }],
    customizedBurgers: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        ingredients: [{
            type: String,
            required: true
        }]
    }],
})

const UserRegisterInformation = mongoose.model("UserRegister", customerSchema);

export default UserRegisterInformation;
