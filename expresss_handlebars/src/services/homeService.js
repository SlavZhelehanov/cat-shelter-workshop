import Cat from "../models/Cat.js";

export default {
    getAllCats() {
        return Cat.find();
    }
};