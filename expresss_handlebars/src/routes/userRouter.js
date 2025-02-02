import { Router } from "express";

const homeRouter = Router();

// REGISTER
homeRouter.get('/sign-up', (req, res) => { 
    return res.render('user/register', { isAuth: false }); 
});

// LOGIN
homeRouter.get('/sign-in', (req, res) => { 
    return res.render('user/login', { isAuth: false }); 
});

export default homeRouter;