import express from "express";
import dotenv from "dotenv";
import "../db_connect.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  try {
    return res.status(200).json({ message: "Welcome to Trend Set Backend" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`Server is Runnig at Port number ${port}`));
