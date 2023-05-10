import logger from "moment-logger";
import createServer, { CreateServerOptions } from "./app";
import { port, isProduction } from "@/config";
import { prisma } from "./database";

async function startServer() {
    try {
        // Connect to SQL Database

        logger.log("Connecting to SQL Database...");
        await prisma.$connect();

        logger.info("Connected to SQL Database");

        // Start Server
        logger.log("Starting Server");

        logger.info(
            `Running in ${isProduction ? "production" : "development"} mode`
        );

        const options: CreateServerOptions = {
            port,
            production: isProduction,
        };

        const app = createServer(options);
        app.listen(options.port);

        logger.info(`Server started on port ${port}`);
    } catch (err) {
        logger.error(err);
    }
}

startServer();
