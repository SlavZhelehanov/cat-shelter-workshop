import { Router } from "express";
import catService from "../services/catService.js";

const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
    let cats = await catService.getAllCats();
    cats = cats.map(cat => cat = { ...cat._doc, isHomePage: true, id: cat._id });
    
    return res.render('home', { isHomePage: true, cats, isAuth: req.user });
});

export default homeRouter;