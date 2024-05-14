import express, { Request, Response } from "express";
import profiles from "../services/profile-svc";

const router = express.Router();

router.get("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;
  const profile = profiles.get(userid);

  if (profile) {
    res.send(profile);
  } else {
    res.status(404).end();
  }
});

router.get("/agent/:name", (req: Request, res: Response) => {
  const { name } = req.params;
  const profileList = profiles.getByAgentName(name);

  if (profileList.length > 0) {
    res.send(profileList);
  } else {
    res.status(404).end();
  }
});

export default router;
