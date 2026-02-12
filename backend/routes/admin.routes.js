import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import Donor from "../models/Donor.js";
import Request from "../models/Request.js";

const router = express.Router();


// Get all donors
router.get(
  "/donors",
  verifyToken,
  isAdmin,
  async (req, res) => {
    const donors = await Donor.find();
    res.json(donors);
  }
);


// Get all requests
router.get(
  "/requests",
  verifyToken,
  isAdmin,
  async (req, res) => {
    const requests = await Request.find();
    res.json(requests);
  }
);

router.patch(
  "/verify/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {
    const donor = await Donor.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true }
    );

    res.json(donor);
  }
);


export default router;
