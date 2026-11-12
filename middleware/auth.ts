import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Define the shape of your decoded JWT payload
export interface UserPayload extends JwtPayload {
  id: number | string;
  email?: string;
}

// Extend Express Request to include `user`
export interface AuthRequest extends Request {
  user?: UserPayload | string;
}

const auth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers["authorization"];
    console.log("token", authHeader);

    if (!authHeader) {
      res.status(403).send("Access denied.");
      return;
    }

    const tokenWithoutBearer = authHeader.split(" ")[1];
    if (!tokenWithoutBearer) {
      res.status(403).send("Access denied. Invalid token format.");
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const decoded = jwt.verify(tokenWithoutBearer, secret) as UserPayload;
    console.log("decoded", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.log("error", error);
    res.status(400).send("Invalid token");
  }
};

export default auth;
