import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user.route.js";
import burgerRouter from "./routes/burgers.route.js";

dotenv.config();

const connectionString = process.env.MONGODB_CONNECTION_STRING;

const app = express();

const port = process.env.PORT;

const allowedOrigins = process.env.CORS_ORIGIN.split(",");

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

mongoose
    .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to database!\n");
    })
    .catch((error) => {
        console.error("MongoDB connection error: ", error);
    });

app.use("/", userRouter);

app.use("/burgers", burgerRouter);

app.listen(port, () => {
    // console.log(`\nServer is running at port ${port}`);
    console.log("Production server ready to use");
});
