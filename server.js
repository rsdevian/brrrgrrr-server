import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import User from "./models/UserRegister.js"

dotenv.config()

const connectionString = process.env.MONGODB_CONNECTION_STRING
const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

mongoose.connect(
    connectionString, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
)
.then(() => 
    {
        console.log("MongoDB database connection established successfully")
    }
)
.catch(error => 
    {
        console.error("MongoDB connection error:", error)
    }
)

app.post('/account/login', async (req, res) => 
{
    const { 
        email, 
        password 
    } = req.body
    try 
    {
        const user = await User.findOne({ email })
        if (!user) 
        {
            return res.status(404).json({ message: "User not found" })
        }
        if (user.password !== password) 
        {
            return res.status(401).json({ message: "Invalid password" })
        }
        const { 
            name, 
            orders,
            customizedBurgers,
            _id 
        } = user
        res.status(200).json({ 
            message: "Login successful",
            name,
            orders, 
            customizedBurgers, 
            userId: _id 
        })
        console.log(user)
    }
    catch (error) 
    {
        console.error("Login error:", error)
        res.status(500).json({ 
            message: error.message 
        });
    }
});

app.post('/account/signup', async (req, res) => 
{
    const { 
        name, 
        email, 
        password 
    } = req.body;
    try 
    {
        const existingUser = await User.findOne({ email });
        if (existingUser) 
        {
            return res.status(400).json({ 
                message: "User already exists" 
            });
        } 
        else 
        {
            const newUser = new User({ 
                name, 
                email, 
                password
             });
            await newUser.save();
        }
        res.status(201).json({ 
            message: "User created successfully" 
        });
    } 
    catch (error) 
    {
        console.error("Signup error: ", error);
        res.status(500).json({ 
            message: "Internal server error" 
        });
    }
});

app.post('/customize'), async (req,res) => {
    try{

    } catch (error) {
        console.error("Customize error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

app.get('/orders', async (req, res) => 
{
    const { userId } = req.body;
    try 
    {
        const user = await User.findById(userId);
        if (!user) 
        {
            return res.status(404).json({ message: "User not found" });
        }
        const orders = user.orders;
        res.status(200).json(orders);
    } 
    catch (error) 
    {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

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
    console.log(`\nServer is running at http://localhost:${port}`);
});

