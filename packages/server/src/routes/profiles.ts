import express, { Request, Response } from "express";
import profiles from "../services/profile-svc";
import { Profile } from "../models/profile";

const router = express.Router();

router.get("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  profiles
    .get(userid)
    .then((profile: Profile | null) => {
      if (profile) {
        res.json(profile);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => res.status(500).send(err));
});

router.get("/agent/:name", (req: Request, res: Response) => {
  const { name } = req.params;

  profiles
    .getByAgentName(name)
    .then((profileList: Profile[]) => {
      if (profileList.length > 0) {
        res.json(profileList);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const newProfile = req.body;

  profiles.update(id, newProfile)
    .then((profile) => res.json(profile))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newProfile = req.body;

  profiles
    .create(newProfile)
    .then((profile: Profile) => res.status(201).send(profile))
    .catch((err) => res.status(500).send(err));
});

router.get("/", (req: Request, res: Response) => {
  profiles
    .index()
    .then((list: Profile[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

export default router;
