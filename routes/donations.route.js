import { Router } from "express";
const router = Router();

import {
  getDonation,
  createDonation,
  updateDonation,
} from "../controllers/donations.controller.js";

router.get("/:id", getDonation);
router.post("/", createDonation);
router.put("/:id", updateDonation);

export default router;
