import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import donorRoutes from "./routes/donor.routes.js";
import requestRoutes from "./routes/request.routes.js";
import adminRoutes from "./routes/admin.routes.js";
// import cors from "cors";
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/donor", donorRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/admin", adminRoutes);

// app.use(
//   cors({
//     origin: "*"
//   })
// );
app.listen(5000, () =>
  console.log("Server running on port 5000")
);
