import { Router, Request, Response, NextFunction } from "express";
import { isProduction } from "@/config";
import { PrismaClientValidationError } from "@prisma/client/runtime";

import api from "./api";

const router = Router();

router.use("/api", api);

// Health check
router.get("/health", (_req, res) => res.sendStatus(200));

router.use((_req: Request, _res: Response, next) => {
    const err = new Error("This route does not exists") as RouteError;
    err.status = 404;
    next(err);
});

router.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: RouteError, _req: Request, res: Response, _next: NextFunction) => {
        const error = err as RouteError;

        // Catch database errors
        if (err instanceof PrismaClientValidationError) {
            // Only change the error message if its in production
            if (isProduction) {
                error.message = "Something went wrong";
            }
        }

        const status = err.status ?? 500;
        res.status(status).json({
            success: false,
            message: status == 500 ? "Something happened" : err.message,
            stack: isProduction ? undefined : error.stack, // Only show stack in development
        });
    }
);

export default router;
