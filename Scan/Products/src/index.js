import "dotenv/config";
import Hapi from "hapi";
import mongoose from "mongoose";
import { AddNewProduct, ListProducts, GetProductById, UpdateProductDetailsById, DeleteProductById} from "../src/product/index";
// import {url} from '../../../Scan/test';

mongoose
  .connect("mongodb://localhost:27017/scan", { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.error(err));

const init = async () => {
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

const server = Hapi.server({
  port: process.env.PORT || 5000,
  host: process.env.IP || "0.0.0.0",
  routes: {
    cors: {
      origin: ["*"],
      headers: ["Accept", "Content-Type"],
      additionalHeaders: ["X-Requested-With"]
    }
  }
});

//-----------------------------Product Starts-------------------
//Create a new product
server.route({
  method: 'POST',
  path: '/scan/add-product',
  handler: AddNewProduct
})
//Get all products
server.route({
  method: 'GET',
  path: '/scan/list-products',
  handler: ListProducts
})
//Get Product by id
server.route({
  method: 'GET',
  path: '/scan/list-product-by-id/{id}',
  handler: GetProductById
})
//Update the product details
server.route({
  method: 'PUT',
  path:'/scan/update-product-details/{product_id}',
  handler: UpdateProductDetailsById
})

//Delete Product by id
server.route({
  method: 'DELETE',
  path: '/scan/delete-product-details-by-id/{product_id}',
  handler: DeleteProductById
})
//-----------------------------Product Ends---------------------

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
