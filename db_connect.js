import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_Connect = async () => {
  try {
    const db_url = process.env.MONDO_DB;
    await mongoose
      .connect(db_url)
      .then(() => console.log("Server Connected to Data Base"))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};
DB_Connect();
