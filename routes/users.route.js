import { Router } from "express";
const router = Router();

import {
  getUsers,
  updateUser,
  createUser,
  getSingleUser,
  softDeleteUser,
} from "../controllers/users.controller.js";

import { verifyToken } from "../controllers/auth.controller.js";
import { getDonationsByUser } from "../controllers/donations.controller.js";

router.get("/", verifyToken, getUsers);
router.post("/", verifyToken, createUser);
router.get("/:id", getSingleUser);
router.get("/:user_id/donations", getDonationsByUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, softDeleteUser);

export default router;
