import express from "express";

import {
  addDonor,
  matchDonors,
  getDonors,
  searchDonors,
  getMyDonorProfile,
  updateDonorProfile,
  toggleAvailability,
  deleteDonorProfile,
  getNearbyDonors
} from "../controllers/donor.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();


// 🔒 Protected Routes
router.post("/", verifyToken, addDonor);

router.get("/me", verifyToken, getMyDonorProfile);

router.put("/me", verifyToken, updateDonorProfile);

router.get("/match", matchDonors);


router.patch(
  "/availability",
  verifyToken,
  toggleAvailability
);

router.delete("/me", verifyToken, deleteDonorProfile);


// 🌍 Public Routes
router.get("/", getDonors);

router.get("/search", searchDonors);

router.get("/nearby", getNearbyDonors);


export default router;
