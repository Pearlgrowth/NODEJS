import addJsonData from "./addJsonData.mjs";
import express from "express";
import bodyParser from "body-parser";
import products from "../data/productsData.json" assert { type: "json" };
import { v4 as uuid } from "uuid";
import addProducts from "./addJsonData.mjs";
import router from './routes/userRoutes.mjs'
const app = express();
app.use(bodyParser.json());
const PORT = 3000;
app.use(router)
app.listen(PORT);