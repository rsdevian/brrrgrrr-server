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

app.listen(port, () => {
    console.log(`\nServer is running at port ${port}`);
});

