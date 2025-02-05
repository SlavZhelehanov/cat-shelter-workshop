import Cat from "../models/Cat.js";
import Breed from "../models/Breed.js";
import formValidator from "../util/formValidator.js";

export default {
    getAllBreeds() {
        return Breed.find({});
    },
    async addCat(data) {
        data.price = +data.price;
        const messages = formValidator.createEditCat(data);
        if (0 < messages.length) return { message: messages.join("; ") };
        const cat = new Cat({ ...data });
        await cat.save();
        return cat;
    },
    async addBreed(breed) {
        const newBreed = new Breed({ breed });
        await newBreed.save();
        return newBreed;
    },
    getAllCats() {
        return Cat.find({});
    },
    getOneCat(id) {
        return Cat.findById(id);
    },
    updateCatInfo(id, cat) {
        cat.price = +cat.price;
        const messages = formValidator.createEditCat(cat);
        if (0 < messages.length) return { message: messages.join("; ") };
        return Cat.findByIdAndUpdate(id, cat);
    },
    removeOneCat(id) {
        return Cat.findByIdAndDelete(id);
    }
};