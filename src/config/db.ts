import mongoose from "mongoose";
import { env } from "./env";

export const conectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URL, {
      dbName: env.DB_NAME,
    });

    return Promise.resolve("Database Connected");
  } catch (error) {
    return Promise.reject(error);
  }
};
