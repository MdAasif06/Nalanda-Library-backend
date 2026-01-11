import express from "express";
import cors from "cors";
import { connectDB } from "./configs/Db.js";
import authRouter from "./routes/auth.route.js";
import bookRoutes from "./routes/book.route.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database call
connectDB();

// Routes
app.use("/api/auth", authRouter);
app.use("/api/books", bookRoutes);
// app.use("/api/borrow", require("./routes/borrow.routes"));
// app.use("/api/reports",reportRoute);

//port define
const PORT = process.env.PORT || 5000;

//server is running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
