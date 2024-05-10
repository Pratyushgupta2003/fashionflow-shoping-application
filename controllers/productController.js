import fs from "fs";
import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import braintree from "braintree";
import OrderModel from "../models/Order.Model.js";
import dotenv from "dotenv";
// import Stripe from "stripe";

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
//braintree token

export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const braintreePayementController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new OrderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};


// export const braintreeTokenController = async (req, res) => {
//   gateway.clientToken.generate({}, function (err, response) {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }
//     res.send(response);
//   });
// };

// //braintree payment
// export const braintreePayementController = async (req, res) => {
//   try {
//     const { cart, nonce } = req.body;
//     let total = 0;
//     cart.map((p) => {
//       total = total + p.price;
//     });

//     let newTransaction = gateway.transaction.sale(
//       {
//         amount: total,
//         paymentMethodNonce: nonce,
//         options: {
//           submitForSettlement: true,
//         },
//       },
//       function (error, result) {
//         if (result) {
//           const newOrder = new OrderModel({
//             products: cart,
//             payment: result,
//             buyer: req.user._id,
//           }).save();
//           res.json({ ok: true });
//         } else {
//           res.status(500).send(error);
//         }
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };
 

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shiping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res
          .status(500)
          .send({ error: "name is required", success: false });
      case !description:
        return res
          .status(500)
          .send({ error: "description is required", success: false });
      case !price:
        return res
          .status(500)
          .send({ error: "price is required", success: false });
      case !quantity:
        return res
          .status(500)
          .send({ error: "quantity is required", success: false });
      case !category:
        return res
          .status(500)
          .send({ error: "category is required", success: false });
      case !shiping:
        return res
          .status(500)
          .send({ error: "shiping is required", success: false });
      case !photo && photo.size > 1000:
        return res
          .status(500)
          .send({ error: "photo is required and should be less than 1mb" });
    }
    const existingProduct = await productModel.findOne({ slug: slugify(name) });
    if (existingProduct) {
      return res.send({
        message: "Product already exist",
        existingProduct,
        success: false,
      });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).send({
      success: true,
      message: "product created succesfully",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in creating product",
      error: error,
    });
  }
};

//upate product
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shiping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });
      case !description:
        return res.status(500).send({ error: "description is required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is required and should be less than 10kb" });
    }
    // const existingProduct = await productModel.findOne({ slug: slugify(name) });
    // if (existingProduct) {
    //   return res.send({
    //     message: "Product already exist so use another name to update ",
    //     existingProduct,
    //   });
    // }
    const products = await productModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).send({
      success: true,
      message: "product updated succesfully",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in updating product",
      error: error,
    });
  }
};

export const getAllProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .populate("category");
    res.status(201).send({
      success: true,
      message: "All product get successfully",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in get all product",
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    // await product.populate("category").execPopulate();

    res.status(201).send({
      success: true,
      message: "product get successfully",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in get single product",
    });
  }
};

export const getPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
    }
    res.status(201).send(product.photo.data);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in getting photo",
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.status(201).send({ message: "product deleted successfuly" });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in deleting product",
    });
  }
};

export const getfilterProductController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    const arg = {};
    if (checked.length > 0) {
      arg.category = checked;
    }
    if (radio.length) {
      arg.price = { $gte: radio[0], $lte: radio[1] };
    }

    const products = await productModel.find(arg);
    res.status(201).send({
      success: true,
      message: "All product filter successfully",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in filtering product",
    });
  }
};

export const getProductTotalCountController = async (req, res) => {
  const total = await productModel.find({}).estimatedDocumentCount();
  res.send({ total });
};

export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "error in search product api",
      error,
    });
  }
};

export const getRelatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({ category: cid, _id: { $ne: pid } })
      .select("-photo")
      .limit(3)
      .populate("category");

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};
