import { Router } from "express";
import homeRouter from "./homeRouter.js";
import catRouter from "./catRouter.js";

const router = Router();

router.use("/", homeRouter);

router.use("/cats", catRouter);

router.all("*", (req, res) => { return res.redirect('/'); });

export default router;