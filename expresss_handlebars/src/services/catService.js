import Cat from "../models/Cat.js";
import Breed from "../models/Breed.js";

export default {
    getAllBreeds() {
        return Breed.find({});
    },
    async addCat(data) {
        const cat = new Cat({ ...data });
        await cat.save();
        return cat;
    },
    async addBreed(breed) {
        const newBreed = new Breed({ breed });
        await newBreed.save();
        return newBreed;
    }
};