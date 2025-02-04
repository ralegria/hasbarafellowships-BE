import { Router } from "express";
const router = Router();

import {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  softDeleteUser,
} from "../controllers/users.controller.js";

import { getDonationsByUser } from "../controllers/donations.controller.js";

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getSingleUser);
router.get("/:user_id/donations", getDonationsByUser);
router.put("/:id", updateUser);
router.delete("/:id", softDeleteUser);

export default router;
