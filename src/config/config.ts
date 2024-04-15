import { config as conf } from "dotenv";
conf();
const _config = {
  port: process.env.PORT,
  databaseUrl: process.env.MONGO_CONNECT_STRING,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  cloudName: process.env.CLOUDINARY_CLOUD,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
};

export const config = Object.freeze(_config);
