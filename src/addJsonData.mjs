import { promises as fsPromise } from "fs";
import { v4 as uuid } from "uuid";
import fs from "fs";
import path from "path";
import products from "../data/productsData.json" assert { type: "json" };

const file = (path.join("Data", "productsData.json"));
const addJsonData = async (message) => {
  const Data = "./data";
  fs.stat(Data, async (err, stats) => {
    if (err && err.message.includes("no such file or directory")) {
      await fsPromise.mkdir(Data);
    }
  })
  createFile(message);
};

const createFile = async (message) => {
  try {
    const id = uuid();
    const products = [
      {
        id: `${id}`,
        productName: "Mangoes",
        productDescription: "Fruits with a seed",
      }
    ]

     
      // {id: `${id}`, productName: "Bananas", productDescription: "Fruits yellow in color"}
    

    const logData = JSON.stringify(products); 

    await fsPromise.appendFile(
     file,
      logData
    );
  } catch (err) {
    console.log(err);
  }
};

const addProducts = (productsItems) => {
  const uid = uuid()
  productsItems.id = uid
  products.push(productsItems);
  console.log(products)
}
// module.exports = addJsonData;
export default addProducts;
