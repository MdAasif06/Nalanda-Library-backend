import express from "express";
import authMiddleware from "../middlewares/auth.middlware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import {
  borrowBook,
  returnBook,
  myBorrowHistory,
} from "../controllers/borrow.controller.js";

const router = express.Router();

/* MEMBER → BORROW */
router.post("/borrow", authMiddleware,roleMiddleware("admin"), borrowBook);

/* MEMBER → RETURN */
router.put("/return/:id", authMiddleware,roleMiddleware("admin"), returnBook);

/* USER → HISTORY */
router.get("/my-history", authMiddleware, myBorrowHistory);

export default router;
