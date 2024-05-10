import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(401)
        .send({ success: false, message: "name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res
        .status(200)
        .send({ success: false, message: "Category Already exist" });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res
      .status(201)
      .send({ success: true, message: "new category created", category });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error in category" });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const existingCategory = await categoryModel.findOne({
      slug: slugify(name),
    });
    if (existingCategory) {
      return res.send({
        message: "category already exist so use another name to update ",
        existingCategory,
      });
    }

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "category updated successfuly",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in update category",
      error,
    });
  }
};

export const getCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "category get successfuly",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in get all category",
      error,
    });
  }
};

//get single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "get single category successfully",
      category,
    });
  } catch (error) {
    res.send({
      suuccess: false,
      message: "Error in getting single category",
      error,
    });
  }
};

//delete category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "category deleted successfuly",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in deleting category",
      error,
    });
  }
};
