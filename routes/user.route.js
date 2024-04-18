import express from "express"
import { signinUser, loginUser, saveOrder } from "../controllers/user.controller.js"

const router = express.Router()

router.post("/account/signup", signinUser)

router.post("/account/login", loginUser)

router.post("/orders/:id", saveOrder)

export default router;