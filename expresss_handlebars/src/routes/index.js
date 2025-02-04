import { Router } from "express";
import homeRouter from "./homeRouter.js";
import catRouter from "./catRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use("/", homeRouter);

router.use("/cats", catRouter);

router.use("/users", userRouter);

router.all("*", (req, res) => { return res.render('404', { isAuth: req.user }); });

export default router;