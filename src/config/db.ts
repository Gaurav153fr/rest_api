import mongoose from "mongoose";
import { config } from "./config";
import { error } from "console";

const connentDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to database successfully");
    });



    mongoose.connection.on("error", () => {
      console.log("Error in connecting to database ", error);
    });



    await mongoose.connect(config.databaseUrl as string);

    
  } catch (err) {
    console.error("Failed to connect to database ", err);
    process.exit(1);
  }
};

export default connentDB;
