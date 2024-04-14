import app from "./src/app";
import { config } from "./src/config/config";
import connentDB from "./src/config/db";

const startServer = async () => {
  await connentDB();
  const port = config.port || 3000;
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};
startServer();
