import ProductInfo from "./model";
import jwt from "jsonwebtoken";
import "dotenv/config";

// Add new product
export const AddNewProduct = async (request, h) => {
  try {
    const nwProductPayload = new ProductInfo(request.payload);
    const saveProductData = await nwProductPayload.save();
    return h.response({
      Message: saveProductData.item_name + " product added successfully ",
      status: 200
    });
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Get All products list
export const ListProducts = async (request, h) => {
  try {
    const getProductsListData = await ProductInfo.find({}).select(
      "-createdAt -updatedAt -__v"
    );
    return h.response(getProductsListData);
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Get product By Id
export const GetProductById = async (request, h) => {
  try {
    const getProductsByIdData = await ProductInfo.find({
      _id: request.params.id
    }).select("-createdAt -updatedAt -__v");
    return h.response(getProductsByIdData);
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Update Product by id
export const UpdateProductDetailsById = async (request, h) => {
  try {
    const updateProductDetails = await ProductInfo.updateOne(
      { _id: request.params.product_id },
      request.payload,
      { new: true }
    );
    return h.response({
      Message: request.payload.item_name + " updated successfully ",
      status: 200
    });
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Delete product by id
export const DeleteProductById = async (request, h) => {
  try {
    const productName = await ProductInfo.find({
      _id: request.params.product_id
    });
    console.log("Length", productName.length);
    if (productName.length > 0) {
      const delProductById = await ProductInfo.deleteOne({
        _id: request.params.product_id
      });
      return h.response({
        Message: productName[0].item_name + " is deleted sucessfully",
        status: 200
      });
    }else return h.response({
      Message: "no records found",
      status: 200
    });
  } catch (error) {
    return h.response(error).code(500);
  }
};
