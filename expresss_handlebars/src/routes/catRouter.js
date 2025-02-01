import { Router } from "express";
import catService from "../services/catService.js";
// import breedService from "../services/breedService.js";

const catRouter = Router();

// ADD CAT
catRouter.get('/add-cat', async (req, res) => {
    const breeds = await catService.getAllBreeds();
    return res.render('addCat', { breeds });
});
catRouter.post('/add-cat', async (req, res) => {
    let { name, description, price, image, breed } = req.body;
    name = name.trim(); description = description.trim(); price = +price.trim();
    image = image.trim(); breed = breed.trim();

    if (!name || !description || !price || price < 0 || !image || !breed) return res.redirect("/cats/add-cat");
   
    const cats = await catService.addCat({ name, description, price, image, breed });
    return res.redirect('/');
});

// ADD BREED
catRouter.get('/add-breed', (req, res) => {
    return res.render('addBreed');
});
catRouter.post('/add-breed', async (req, res) => {
    if (req.body.breed && typeof req.body.breed === "string" && 0 < req.body.breed.length) {
        await catService.addBreed(req.body.breed);
        return res.redirect("/cats/add-cat");
    }
    return res.redirect("/cats/add-breed");
});

export default catRouter;