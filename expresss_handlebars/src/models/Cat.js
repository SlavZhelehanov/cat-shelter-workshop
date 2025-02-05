import mongoose from "mongoose";

export default mongoose.model("Cat", new mongoose.Schema({
    name: { type: String, required: [true, "Name field can't be empty"] },
    description: { type: String, required: [true, "Description field can't be empty"] },
    breed: { type: String, required: [true, "Breed field can't be empty"] },
    price: { type: Number, min: [0, "Price must be larger than 0"] },
    image: { type: String, required: [true, "Image field can't be empty"] },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true }));