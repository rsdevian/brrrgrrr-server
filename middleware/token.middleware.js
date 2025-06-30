import jwt from "jsonwebtoken";

async function generateToken(userId, email) {
    return jwt.sign({ userId, email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
}

export { generateToken };
