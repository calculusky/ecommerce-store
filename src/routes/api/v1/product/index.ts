import { Router } from "express";

import * as Check from "@/middlewares/schema";

import * as Product from "@/controllers/product";

const router = Router();

router.post(
    "/",
    Check.body(Product.Schema.CreateProductSchema),
    Product.createProduct
);

router.get("/", Product.getProducts);

export default router;
