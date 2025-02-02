import { Router } from "express";

const homeRouter = Router();

// REGISTER
homeRouter.get('/sign-up', (req, res) => { 
    return res.render('user/register', { isAuth: false }); 
});

export default homeRouter;