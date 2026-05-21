import { configDotenv } from "dotenv";
import type { SignOptions } from "jsonwebtoken";

const env: Record<string, string | undefined> = {};

configDotenv({ processEnv: env, quiet: true });

const config = {
  port: Number(env.PORT) || 5000,
  connectionString: env.DATABASE_URL as string,
  secret: env.SECRET as string,
  tokenExpiresIn: (env.EXPIRY as SignOptions["expiresIn"]) || "1d",
};

// console.log(config.secret);

export default config;
