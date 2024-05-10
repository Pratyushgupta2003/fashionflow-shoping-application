import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import OrderModel from "../models/Order.Model.js";


export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, ans ,role } = req.body;
    console.log(req.body);
    //validation
    if (!name) return res.send({ message: "Name is required" });
    if (!email) return res.send({ message: "email is required" });
    if (!password) return res.send({ message: "password is required" });
    if (!phone) return res.send({ error: "phone is required" });
    if (!address) return res.send({ error: "address is required" });
    if (!ans) return res.send({ error: "answer is required" });
    //check existing user with same email
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
  
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      ans,
      role
    }).save();

    res.status(201).send({
      success: true,
      message: "user register succesfuly",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in registration",
      error,
    });
  }
};

//login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check email registered or not
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "email is not register" });
    }

    //check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        succes: false,
        message: "Invalid password",
      });
    }
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login succesfull",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "error in login",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  res.send("protected");
};

//forgot password
/*
export const forgotPasswordController = async (req, res) => {
  console.log("user is");
  try {
    const [email, ans, newPassword] = req.body;
    if (!email)
      return res.send({ success: false, messsage: "Email is required" });
    if (!ans) return res.send({ success: false, messsage: "ans is required" });
    if (!newPassword)
      return res.send({ success: false, messsage: "newpassword is required" });
    const user = userModel.findOne({ email, ans });
    console.log("user is", user);
    if (!user)
      return res
        .status(404)
        .send({ success: false, messsage: "wrong email or ans" });
    const hashed = hashPassword(newPassword);
    userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.send({
      success: true,
      message: "password reset succesfully",
    });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "error" });
  }
};

import userModel from "../models/userModel.js";
import { hashPassword } from "../helper/authHelper.js";
*/
export const forgotPasswordController = async (req, res) => {
  console.log("user is");
  try {
    const { email, ans, newPassword } = req.body; // Destructure req.body
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required" }); // Send response as JSON
    if (!ans)
      return res
        .status(400)
        .json({ success: false, message: "ans is required" }); // Send response as JSON
    if (!newPassword)
      return res
        .status(400)
        .json({ success: false, message: "newpassword is required" }); // Send response as JSON

    const user = await userModel.findOne({ email, ans }); // Await userModel.findOne
    console.log("user is", user);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Wrong email or ans" }); // Send response as JSON

    const hashed = await hashPassword(newPassword); // Await hashPassword
    await userModel.findByIdAndUpdate(user._id, { password: hashed }); // Await userModel.findByIdAndUpdate

    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully" }); // Send response as JSON
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error" }); // Send response as JSON
  }
};

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    console.log("req");
    const { username, email, password, address, phone } = req.body;
    // const username = "abc";
    // const email = "abc@gmail.com";
    // const password = "12345678";
    // const address = "abc";
    // const phone = "9876543211";
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: username || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
        email: email || user.email,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

export const getOrdersController = async (req, res) => {
  try {
    const orders = await OrderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    // const orders = await OrderModel.find({buyer:req.user._id})

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await OrderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name");
      // .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};
