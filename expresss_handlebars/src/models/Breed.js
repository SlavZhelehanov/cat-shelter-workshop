import mongoose from "mongoose";

export default mongoose.model("Breed", new mongoose.Schema({
    breed: { type: String, required: [true, "Breed field can't be empty"] }
}, { timestamps: true }));