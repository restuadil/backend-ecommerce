import { Application, Request, Response } from "express";
import express from "express";
import { logger } from "./config/logger";
import { conectDB } from "./config/db";
import { env } from "./config/env";
import { errorMiddleware } from "./middlewares/error.middleware";
import { logMiddleware } from "./middlewares/log.middleware";
import { router } from "./routes/api";
import { notFoundMiddleware } from "./middlewares/notFound.middleware";

async function init() {
  try {
    const db = await conectDB();
    logger.info(`Database status : ${db}`);

    const app: Application = express();

    // middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(logMiddleware);

    app.get("/api", (req: Request, res: Response) => {
      res.send("Server is Running");
    });
    app.use("/api", router);

    app.use(notFoundMiddleware);
    app.use(errorMiddleware);

    app.listen(env.PORT, () => {
      logger.info(`App listening on ${env.PORT}`);
    });
  } catch (error) {
    logger.error(error);
  }
}

init();
