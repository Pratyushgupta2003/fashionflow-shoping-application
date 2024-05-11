import userModel from "../models/userModel.js";

export const getUserController = async(req ,res)=>{
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "user get successfuly",
      users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in get all user",
      error,
    });
  }
}

export const deleteUserController = async(req,res)=>{
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "user deleted successfuly",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in deleting user",
      error,
    });
  }
}