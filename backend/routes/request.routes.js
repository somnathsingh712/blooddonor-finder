import express from "express";

import {
  createRequest,
  getRequests,
  fulfillRequest
} from "../controllers/request.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createRequest);
router.get("/", getRequests);
router.patch(
  "/:id/fulfill",
  fulfillRequest
);

export default router;
