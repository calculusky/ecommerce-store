import * as ProductService from "@/services/product";
import { Controller } from "../interfaces";
export * as Schema from "@/services/product/schema";

export const createProduct: Controller = async (req, res, next) => {
    try {
        const options: ProductService.CreateProductOptions = req.body;
        const data = await ProductService.createProduct(options);
        return res.status(201).json(data);
    } catch (error) {
        next(error);
    }
};

export const getProducts: Controller = async (req, res, next) => {
    try {
        const data = await ProductService.getProducts();
        return res.json(data);
    } catch (error) {
        next(error);
    }
};
