import { Router } from "express";
import {
  query,
  matchedData,
  validationResult,
  body,
  checkSchema,
} from "express-validator";
import { createValidationSchema } from '../utils/validationSchema.mjs';
import  products from "../utils/constantData.mjs"

const router = Router();

// //middle ware
// const mySimpleMiddleWare = (req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// };
// ap
 // GETTING THE JSON DATA CREATED BY THE FILE SYSTEM.
router.get("/products", (req, res) => {
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).send("Not found");
  }
});

//GETTING DATA PER ID
router.get("/products:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId))
    return res.status(400).send({ message: "Bad request. Invalid id" });
  const findProduct = products.find((product) => product.id === parsedId);
  if (!findProduct) return res.sendStatus(404);
  res.send(findProduct);
});

//GETTING DATA WITH VALIDATIONS
router.get(
  "/products",
  [
    query("filter")
      .isString()
      .withMessage("must be a string")
      //very important
      .escape(),
    query("value").isString(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { filter, value } = matchedData(req);
      if (filter && value) {
        return res.send(
          products.filter((product) => product[filter].includes(value))
        );
      }
    }

    res.send(products);
  }
);

//POSTING DATA WITH VALIDATIONS
router.post("/products/add", checkSchema(createValidationSchema), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const data = matchedData(req);
  const addProducts = { id: products[products.length - 1].id + 1, ...data };

  products.push(addProducts);
  return res.status(201).send(addProducts);
})
//PUT USING ROUTER
router.put("/products:id", (req, res) => {
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
//PATCH UDING ROUTER
router.patch("/products/:id", (req, res) => {
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

//DELETING USING ROUTER
router.delete("/products:id", (req, res) => {
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
export default router;