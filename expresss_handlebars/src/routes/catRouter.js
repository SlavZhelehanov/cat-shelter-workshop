import { Router } from "express";
// import homeService from "../services/homeService.js";
// import breedService from "../services/breedService.js";

const catRouter = Router();

// ADD CAT
catRouter.get('/add-cat', async (req, res) => {
    return res.render('addCat');
});
catRouter.get('/add-breed', async (req, res) => {
    return res.render('addBreed');
});

export default catRouter;