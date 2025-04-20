import "dotenv/config";

export const env = {
  MONGO_URL: process.env.MONGO_URL || "",
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "",
  DB_NAME: process.env.DB_NAME || "",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
  SECRET: process.env.SECRET || "",
};
