import app from "./app";

import { AppDataSource } from "./config/db";


async function main() {
  try {
  
    await AppDataSource.initialize();
    app.listen(3000);
    console.log("Server on port", 3000);
  } catch (error) {
    console.error(error);
  }
}

main();