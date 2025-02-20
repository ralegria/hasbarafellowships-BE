import { Router } from "express";

import {
  getDonation,
  updateDonation,
  generateStripeURL,
} from "../controllers/donations.controller.js";
import { verifyToken } from "../controllers/auth.controller.js";

const router = Router();

router.get("/:id", verifyToken, getDonation);
router.post("/generate", generateStripeURL);
router.put("/:id", verifyToken, updateDonation);

export default router;
