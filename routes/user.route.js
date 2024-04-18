import express from "express"
import { signinUser, loginUser, saveOrder, saveCustomized, cancelOrder} from "../controllers/user.controller.js"

const router = express.Router()

router.post("/account/signup", signinUser)

router.post("/account/login", loginUser)

router.post("/orders/:id", saveOrder)

router.post("/customize/:id", saveCustomized)

router.post("/orders/cancel/:id", cancelOrder)

export default router;