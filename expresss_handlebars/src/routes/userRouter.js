import { Router } from "express";
import userService from "../services/userService.js";
import constants from "../util/constants.js";
import middlewares from "../util/middlewares.js";

const userRouter = Router();

// REGISTER
userRouter.get('/sign-up', middlewares.isGuest, (req, res) => {
    return res.render('user/register', { isAuth: false });
});
userRouter.post('/sign-up', middlewares.isGuest, async (req, res) => {
    const data = await userService.register(req.body);
    if (data.message) console.log(data.message);
    else middlewares.sign({ id: data._id }, res);
    return res.redirect("/");
});

// LOGIN
userRouter.get('/sign-in', middlewares.isGuest, (req, res) => {
    return res.render('user/login', { isAuth: false });
});
userRouter.post('/sign-in', middlewares.isGuest, async (req, res) => {
    const data = await userService.login(req.body);
    if (data.message) console.log(data.message);
    else middlewares.sign({ id: data }, res);
    return res.redirect("/");
});

// LOGOUT
userRouter.delete('/sign-out', middlewares.isUser, (req, res) => {
    res.clearCookie(constants.COOKIE_NAME);
    return res.redirect("/");
});

export default userRouter;