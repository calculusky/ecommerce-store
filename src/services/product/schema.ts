import * as Yup from "yup";
import { CreateProductOptions } from "./interfaces";

export const CreateProductSchema: Yup.ObjectSchema<CreateProductOptions> =
    Yup.object().shape({
        name: Yup.string().required(),
        price: Yup.number().required(),
        quantity: Yup.number().required(),
    });
