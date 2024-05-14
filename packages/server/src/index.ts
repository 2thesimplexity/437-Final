import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import profiles from "./routes/profiles";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";
connect("realestate"); 
app.use(express.static(staticDir));
app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.use("/api/profiles", profiles);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
