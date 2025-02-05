import { Router } from "express";
import catService from "../services/catService.js";
import middlewares from "../util/middlewares.js";

const catRouter = Router();

// ADD CAT
catRouter.get('/add-cat', middlewares.isUser, async (req, res) => {
    const breeds = await catService.getAllBreeds();
    return res.render('addCat', { breeds, isAuth: req.user });
});
catRouter.post('/add-cat', middlewares.isUser, async (req, res) => {
    let { name, description, price, image, breed } = req.body;
    name = name.trim(); description = description.trim(); price = +price.trim();

    const cat = await catService.addCat({ name, description, price, image, breed, creator: req.user.id });
    if (cat.message) {
        console.log(cat.message);
        return res.redirect("/cats/add-cat");
    }
    return res.redirect('/');
});

// CHANGE INFO
catRouter.get('/:id/change-info', middlewares.isUser, async (req, res) => {
    const cat = await catService.getOneCat(req.params.id);
    const breeds = await catService.getAllBreeds();

    if (!cat) return res.redirect('/404');
    return res.render('editCat', { cat, breeds, isAuth: req.user });
});
catRouter.post('/:id/change-info', middlewares.isUser, async (req, res) => {
    let cat = { name: "", description: "", breed: "", price: 0, image: "" };

    for (const key in cat) {
        if (key === "price" && req.body[key]) cat[key] = +req.body[key].trim();
        if (key != "price" && req.body[key]) cat[key] = req.body[key].trim();
    }

    const updatedCat = await catService.updateCatInfo(req.params.id, cat);
    if (updatedCat.message) {
        console.log(updatedCat.message);
        return res.redirect(`/cats/${req.params.id}/change-info`);
    }
    return res.redirect('/');
});

// ADD BREED
catRouter.get('/add-breed', middlewares.isUser, (req, res) => {
    return res.render('addBreed', { isAuth: req.user });
});
catRouter.post('/add-breed', middlewares.isUser, async (req, res) => {
    if (req.body.breed && typeof req.body.breed === "string" && 0 < req.body.breed.length) {
        await catService.addBreed(req.body.breed);
        return res.redirect("/cats/add-cat");
    }
    return res.redirect("/cats/add-breed");
});

// DELETE CAT
catRouter.get('/:id/new-home', middlewares.isUser, async (req, res) => {
    const cat = await catService.getOneCat(req.params.id);
    if (!cat) return res.redirect('/404');
    return res.render('catShelter', { cat, isAuth: req.user });
});
catRouter.post('/:id/new-home', middlewares.isUser, async (req, res) => {
    const cat = await catService.getOneCat(req.params.id);
    if (!cat) return res.redirect('/404');
    await catService.removeOneCat(req.params.id);
    return res.redirect('/');
});

export default catRouter;