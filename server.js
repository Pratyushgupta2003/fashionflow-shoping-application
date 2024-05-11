import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import path from 'path';
import { fileURLToPath } from "url";
import userRoute from "./routes/userRoute.js"
//configure env
dotenv.config();

//database config
connectDB();


//esmodule fix
const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);


const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'./client/dist')))
//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/user", userRoute);
app.use('*' , function(req,res){
  res.sendFile(path.join(__dirname, './client/build/index.html'));
})
// app.get("/", (req, res) => {
//   res.send({
//     message: "welcome",
//   });
// });

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`.bgCyan.white);
});
