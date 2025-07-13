import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { AuthRequest } from "types/express";

const router = express.Router();

router.get("/profile", protect, (req: AuthRequest, res) => {
  res.json({ message: "Hello, this is your profile!", user: req.user });
});

export default router;
