import app from "./app";
import config from "./config";
import { initDB } from "./db";

const PORT = config.port;

const main = async () => {
  initDB();
  app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
};

main();
