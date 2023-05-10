import * as Yup from "yup";
import { ItemOptions, PriceFilter } from "./interfaces";

const ItemSchema: Yup.ObjectSchema<ItemOptions> = Yup.object().shape({
    productId: Yup.number().required(),
    price: Yup.number().required(),
    quantity: Yup.number().required(),
});

export const CreateOrderSchema = Yup.object().shape({
    items: Yup.array().of(ItemSchema).required(),
});

export const GetOrdersSchema = Yup.object().shape({
    page: Yup.number(),
    priceFilter: Yup.mixed().oneOf(Object.values(PriceFilter)),
});
