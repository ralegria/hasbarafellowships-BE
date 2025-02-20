import { Router } from "express";

import { createDonationHook } from "../controllers/donations.controller.js";

const router = Router();

router.post("/create-donation", createDonationHook);

export default router;
