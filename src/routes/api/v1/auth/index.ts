import { Router } from "express";

import * as Check from "@/middlewares/schema";

import * as Auth from "@/controllers/auth";

const router = Router();

router.post("/signup", Check.body(Auth.Schema.SignupSchema), Auth.signup);

router.post("/login", Check.body(Auth.Schema.LoginSchema), Auth.login);

export default router;
