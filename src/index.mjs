import addJsonData from "./addJsonData.mjs";
import express from "express";
import bodyParser from "body-parser";
import products from "../data/productsData.json" assert { type: "json" };
import { v4 as uuid } from "uuid";
import addProducts from "./addJsonData.mjs";
const app = express();
app.use(bodyParser.json());
const PORT = 3000;
// addJsonData("msg");

// GETTING THE JSON DATA CREATED BY THE FILE SYSTEM.
app.get("/products", (req, res) => {
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).send("Not found");
  }
});

//POSTING DATA TO THE PRODUCTS JSON
app.post("/products/add", (req, res) => {
  const productsItems = req.body;
  addProducts(productsItems)
  res.status(200).json(productsItems)
  res.end()
});

// FINDING PRODUCTS PER PRODUCT ID
app.get("/products:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId))
    return res.status(400).send({ message: "Bad request. Invalid id" });
  const findProduct = products.find((product) => product.id === parsedId);
  if (!findProduct) return res.sendStatus(404);
  res.send(findProduct);
});

//EDITING DATA TO THE JSON: PUT WHICH WILL OVEWRITE THE EXISTING DATA.
app.put("/products:id", (req, res) => {
  const { id, productName, productDescription } = req.body;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findProductId = products.findIndex((product) => {
    return product.id === parsedId;
  });
  if (findProductId === -1) return res.sendStatus(404);
  products[findProductId] = { id: parsedId, productName, productDescription };
  return res.sendStatus(200);
});

//EDITING AN ITEM USING PATCH
app.patch("/products/:id", (req, res) => {
  const { id, productName, productDescription } = req.body;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findProductId = products.findIndex((product) => {
    return product.id === parsedId;
  });
  if (findProductId === -1) return res.sendStatus(404);
  products[findProductId] = {
    ...products[findProductId],
    productName,
    productDescription,
  };
  return res.sendStatus(200);
});

//DELETING A PRODUCT.
app.delete("/products:id", (req, res) => {
  const { id, productName, productDescription } = req.body;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findProductId = pr.findIndex((product) => {
    return product.id === parsedId;
  });
  if (findProductId === -1) return res.sendStatus(404);
  product.splice(findProductId, 1);
  return res.sendStatus(200);
});
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
