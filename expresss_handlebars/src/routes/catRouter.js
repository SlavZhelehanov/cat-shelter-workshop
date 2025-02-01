import { Router } from "express";
import catService from "../services/catService.js";

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

// CHANGE INFO
catRouter.get('/:id/change-info', async (req, res) => {
    const cat = await catService.getOneCat(req.params.id);
    const breeds = await catService.getAllBreeds();
    
    if (!cat) return res.redirect('/404');
    return res.render('editCat', { cat, breeds });
});
// catRouter.post('/cats/:id/change-info', (req, res) => {
//     const idx = cats.findIndex(u => u.id === req.params.id);
//     if (idx === -1) return res.redirect("/");
//     let cat = { name: "", description: "", breed: "", price: 0, image: "" };

//     for (const key in cat) {
//         if (key === "price" && req.body[key]) cat[key] = +req.body[key].trim();
//         if (key != "price" && req.body[key]) cat[key] = req.body[key].trim();
//     }    

//     if (0 < cat.name.length && 0 < cat.description.length && 0 < cat.breed.length && 0 < cat.price && 0 < cat.image.length) {
//         cats[idx] = { id: req.params.id, ...cat };
//         writeData(catsPath, cats);
//     }
//     return res.redirect('/');
// });

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