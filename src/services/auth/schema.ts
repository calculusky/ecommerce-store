import * as Yup from "yup";
import { LoginOptions, SignupOptions } from "./interfaces";

export const SignupSchema: Yup.ObjectSchema<SignupOptions> = Yup.object().shape(
    {
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
    }
);

export const LoginSchema: Yup.ObjectSchema<LoginOptions> = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
});
