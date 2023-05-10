import { Router } from "express";

import auth from "./auth";

import product from "./product";

import order from "./order";

const router = Router();

router.use("/auth", auth);

router.use("/products", product);

router.use("/orders", order);

export default router;
