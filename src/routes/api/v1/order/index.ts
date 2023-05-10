import { Router } from "express";

import * as Check from "@/middlewares/schema";

import * as Order from "@/controllers/order";
import { isAuthenticated } from "@/middlewares/authentication";

const router = Router();

router.post(
    "/",
    isAuthenticated,
    Check.body(Order.Schema.CreateOrderSchema),
    Order.createOrder
);

router.get(
    "/",
    isAuthenticated,
    Check.query(Order.Schema.GetOrdersSchema),
    Order.getOrders
);

export default router;
