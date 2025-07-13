import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Server is running...");
});

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
