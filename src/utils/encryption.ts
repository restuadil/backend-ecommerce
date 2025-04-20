import crypto from "crypto";
import { env } from "../config/env";

export const encrypt = (password: string) => {
  const encrypted = crypto
    .pbkdf2Sync(password, env.SECRET, 1000, 64, "sha512")
    .toString("hex");
  return encrypted;
};
