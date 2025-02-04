import { Router } from "express";
const router = Router();

import {
  getCurrentGoal,
  getGoalHistory,
  createGoal,
} from "../controllers/goals.controller.js";

router.get("/:user_id", getCurrentGoal);
router.get("/history/:user_id", getGoalHistory);
router.post("/", createGoal);

export default router;
