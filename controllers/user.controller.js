import User from "../models/userregister.model.js";

async function signinUser(req,res) {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        } else {  
            const newUser = new User({ name, email, password });
            await newUser.save();
        }
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
            console.error("Signup error: ", error);
            res.status(500).json({ message: "Internal server error" });
        }
};

async function loginUser (req, res) {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" })
        }
        const { name, orders, customizedBurgers,_id } = user
        res.status(200).json({ message: "Login successful", name, orders, customizedBurgers, userId: _id })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function saveOrder(req, res) {
    try {
        const { title, price } = req.body;
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingOrder = user.orders.find(order => order.name === title);
        if (existingOrder) {
            existingOrder.quantity += 1;
        } else {
            const newOrder = { name: title, quantity: 1, price: price };
            user.orders.push(newOrder);
        }
        await user.save();
        res.status(200).json({ message: "Order submitted successfully" });
    } catch (error) {
        console.error("Error saving order: ", error);
        res.status(500).json({ message: error.message });
    }
};

async function saveCustomized (req, res) {
        try {
            const { id, burgerName, ingredients } = req.body;
            const user = await User.findById(id);
            if (!user){
                return res.status(404).json({ message: "User Not Found" });
            }
    
            const existingCustomizedOrder = user.customizedBurgers.find(order => order.name === burgerName);
            if (existingCustomizedOrder) {
                return res.status(409).json({ message: "Burger already customized" });
            }

            const newCustomizedOrder = { name: burgerName, ingredients: ingredients , price: 200};
            user.customizedBurgers.push(newCustomizedOrder);
            await user.save();
    
            res.status(200).json({ message: "Order submitted successfully" });
        } catch (error) {
            console.error("Error saving order: ", error);
            res.status(500).json({ message: error.message });
        }
};

async function cancelOrder (req,res) {
    try {
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export { signinUser, loginUser, saveOrder, saveCustomized, cancelOrder };