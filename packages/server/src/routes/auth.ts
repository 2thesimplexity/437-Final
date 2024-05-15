import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import credentials from "../services/credential-svc";

dotenv.config();
const TOKEN_SECRET: string = process.env.TOKEN_SECRET || "NOT_A_SECRET";

const router = express.Router();

router.post("/register", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.log("Bad request: Invalid input data.");
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    credentials
      .create(username, password)
      .then((creds) => generateAccessToken(creds.username))
      .then((token) => {
        res.status(201).send({ token: token });
      })
      .catch((error) => {
        console.log("Error creating user:", error);
        res.status(400).send(error);
      });
  }
});

router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.log("Bad request: Invalid input data.");
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    credentials
      .verify(username, password)
      .then((goodUser: string) => generateAccessToken(goodUser))
      .then((token) => res.status(200).send({ token: token }))
      .catch((error) => {
        console.log("Unauthorized:", error);
        res.status(401).send("Unauthorized");
      });
  }
});

function generateAccessToken(username: string): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      TOKEN_SECRET,
      { expiresIn: "1d" },
      (error: any, token: string | undefined) => {
        if (error) reject(error);
        else resolve(token as string);
      }
    );
  });
}

export function authenticateUser(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided, authorization denied" });
  } else {
    jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
      if (error) {
        return res.status(403).json({ error: "Token is not valid" });
      } else {
        next();
      }
    });
  }
}

export default router;
