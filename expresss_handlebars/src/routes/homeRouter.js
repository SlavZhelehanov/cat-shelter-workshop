import { Router } from "express";
import catService from "../services/catService.js";

const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
    const cats = await catService.getAllCats();
    return res.render('home', { isHomePage: true, cats, isAuth: req.user });
});

export default homeRouter;