import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import User from "./models/userregister.model.js"
import router from "./routes/user.route.js"

dotenv.config()

const connectionString = process.env.MONGODB_CONNECTION_STRING
const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({extended:false}))

mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => {console.log("Connected to database!\n")})
    .catch(error => {console.error("MongoDB connection error: ", error)
})

app.use('/', router);

app.post('/customize'), async (req,res) => {
    try{
        const { burgerName, ingredients, email} = req.body;
        const user = await User.findOne({email});
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const newCustomizedBurger = {
            name: burgerName,
            ingredients: ingredients
        }
        user.customizedBurgers.push(newCustomizedBurger)
        await user.save();

        res.status(201).json({
            message: "Burger customized successfully"
        });

    } catch (error) {
        console.error("Customize error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

app.post('orders/delete-order/:email/:index', async (req, res) => {
    const { 
        email, 
        index 
    } = req.params;
    try 
    {
        const user = await User.findOne({ email });
        if (!user) 
        {
            console.log(user);
            return res.status(404).json({ message: "User not found" });
        }
        const orderIndex = parseInt(index);
        user.orders.splice(orderIndex, 1);
        await user.save();
        res.status(200).json({ message: "Order deleted successfully" });
    } 
    catch (error) 
    {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Internal server error", user });
    }
});

app.listen(port, () => {
    console.log(`\nServer is running at port ${port}`);
});

