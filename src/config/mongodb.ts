import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoDbUrl = process.env.MONGODB_URL_STRING as string;

export default (async () => {
  try {
    await mongoose.connect(mongoDbUrl);
    console.log("MongoDB Conected!!!");
  } catch (error) {
    console.log("Error :>>", error);
    process.exit(1);
  }
})(); // la función se llamará cuando importamos el archivo