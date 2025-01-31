import { Router } from "express";
import homeRouter from "./homeRouter.js";

const router = Router();

router.use("/", homeRouter);

router.all("*", (req, res) => { return res.redirect('/'); });

export default router;