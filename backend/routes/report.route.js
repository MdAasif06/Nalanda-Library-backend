// routes/report.route.js
import express from "express";
import {
  mostBorrowedBooks,
  mostActiveMembers,
  bookAvailabilityReport
} from "../controllers/report.controller.js";

import authMiddleware from "../middlewares/auth.middlware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

// Admin only
router.get("/most-borrowed-books", authMiddleware, roleMiddleware("admin"), mostBorrowedBooks);
router.get("/active-members", authMiddleware, roleMiddleware("admin"), mostActiveMembers);
router.get("/book-availability", authMiddleware, roleMiddleware("admin"), bookAvailabilityReport);

export default router;
