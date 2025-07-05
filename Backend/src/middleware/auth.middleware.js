import  jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, please login" });
        }
        const jwtSecret = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production";
        const decoded = jwt.verify(token, jwtSecret);

        if(!decoded){
            return res.status(401).json({ message: "Unauthorized-Invalid Token" });
        }

        const user=await User.findById(decoded.userId);

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user; // Attach user to request object
        next();
    }
    catch (error) {
        console.error("Error in protectRoute middleware:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}