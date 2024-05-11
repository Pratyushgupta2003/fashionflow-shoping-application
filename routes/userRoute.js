import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { deleteUserController, getUserController } from "../controllers/userController.js";

const router = express.Router();


//get all category
router.get("/get-user",requireSignIn , isAdmin, getUserController);

//delete category
router.delete(
  "/delete-user/:id",
  requireSignIn,
  isAdmin,
  deleteUserController
);

export default router;
