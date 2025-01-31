import { Router } from "express";
import homeService from "../services/homeService.js";

const homeRouter = Router();

homeRouter.get('/', async (req, res) => { 
    const cats = await homeService.getAllCats();
    return res.render('home', { isHomePage: true, cats }); 
});

export default homeRouter;