import express from "express";
import dotenv from "dotenv";

/** .env config */
dotenv.config();

/** init express */
const app = express();

/** express middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
