import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";
import { AuthRequest } from "types/express";

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };

      const user = await User.findById(decoded.id).select("-password");

      // const user = await User.findById(decoded.id).select("-password").lean();

      //   const user = (await User.findById(decoded.id).select(
      //     "-password"
      //   )) as IUser & { _id: string };

      if (!user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      req.user = {
        _id: String(user._id),
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      };

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
