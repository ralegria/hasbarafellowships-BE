import { Router } from "express";
const router = Router();

import {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  softDeleteUser,
} from "../controllers/users.controller.js";

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getSingleUser);
router.put("/:id", updateUser);
router.delete("/:id", softDeleteUser);

export default router;
