import { configDotenv } from "dotenv";

const env: Record<string, string | undefined> = {};

configDotenv({ processEnv: env, quiet: true });

const config = {
  port: Number(env.PORT) || 5000,
  connectionString: env.DATABASE_URL as string,
};

// console.log(config.port, config.connectionString);

export default config;
