import mongoose from "mongoose";

export default mongoose.model("User", new mongoose.Schema({
    username: { type: String, minLength: [2, "Username must be at least 2 characters long"] },
    email: { type: String, minLength: [10, "Email must be at least 10 characters long"] },
    password: { type: String, minLength: [8, "Password must be at least 8 characters long"] },
}));