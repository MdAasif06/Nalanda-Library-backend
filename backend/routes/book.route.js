import express from "express";
import {
  createBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getBookById,
} from "../controllers/book.controller.js";

import authMiddleware from "../middlewares/auth.middlware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

// ADMIN ONLY 
router.post("/", authMiddleware, roleMiddleware("admin"), createBook);

router.put("/:id", authMiddleware, roleMiddleware("admin"), updateBook);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteBook);

//  ADMIN + MEMBER 
router.get("/", authMiddleware, getAllBooks);
router.get("/:id", authMiddleware, getBookById);

export default router;
