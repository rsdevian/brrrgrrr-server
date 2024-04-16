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
            required: false
        }
    }],
    customizedBurgers: [{
        name: {
            type: String,
            required: false
        },
        ingredients: [{
            type: String,
            required: false
        }],
        price: {
            type: Number,
            required: false
        }
    }]
});

const UserRegisterInformation = mongoose.model("UserRegister", customerSchema);

export default UserRegisterInformation;