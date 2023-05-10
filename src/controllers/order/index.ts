import { Controller } from "../interfaces";
import * as OrderService from "@/services/order";
import { User } from "@prisma/client";

export * as Schema from "@/services/order/schema";

export const createOrder: Controller<User> = async (req, res, next) => {
    try {
        const options: OrderService.CreateOrderOptions = req.body;
        const user: User = req.user;
        const data = await OrderService.createOrder(options, user);
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
};

export const getOrders: Controller<User> = async (req, res, next) => {
    try {
        const options: OrderService.GetOrdersQueryOptions = req.query;
        const user: User = req.user;
        const data = await OrderService.getOrders(user.id, options);
        res.json(data);
    } catch (error) {
        next(error);
    }
};
