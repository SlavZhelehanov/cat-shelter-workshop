import { Router } from "express";
import homeService from "../services/homeService.js";

const catRouter = Router();

// ADD CAT
catRouter.get('/add-cat', async (req, res) => {
    return res.render('addCat');
});

export default catRouter;