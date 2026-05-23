import { configDotenv } from "dotenv";
import type { SignOptions } from "jsonwebtoken";

configDotenv({ quiet: true });

const config = {
  port: Number(process.env.PORT) || 5000,
  connectionString: process.env.DATABASE_URL as string,
  secret: process.env.SECRET as string,
  tokenExpiresIn: (process.env.EXPIRY as SignOptions["expiresIn"]) || "1d",
};

export default config;
