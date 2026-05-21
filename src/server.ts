import app from "./app";

const main = async () => {
  app.listen(3000, () => {
    console.log(`Server is running at port 3000`);
  });
};

main();
