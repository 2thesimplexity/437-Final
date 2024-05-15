import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import profiles from "./routes/profiles";
import auth, { authenticateUser } from "./routes/auth"; // Correct import for authenticateUser

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("realestate");

app.use(express.static(staticDir));
app.use(express.json());
app.use(require('connect-flash')()); // Ensure you have connect-flash set up correctly

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.use("/api/profiles", authenticateUser, profiles); // Apply middleware to protect routes
app.use("/auth", auth); // Register auth routes

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
