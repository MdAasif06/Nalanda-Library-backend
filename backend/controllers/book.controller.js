import Book from "../models/book.model.js";

/* =========================
   ADMIN: CREATE BOOK
========================= */
export const createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

/* =========================
   ADMIN: UPDATE BOOK
========================= */
export const updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!book)
    return res.status(404).json({ message: "Book not found" });

  res.json(book);
};

/* =========================
   ADMIN: DELETE BOOK
========================= */
export const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book)
    return res.status(404).json({ message: "Book not found" });

  res.json({ message: "Book deleted successfully" });
};

/* =========================
   ALL USERS: GET ALL BOOKS
========================= */
export const getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

/* =========================
   ALL USERS: GET BOOK BY ID
========================= */
export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book)
    return res.status(404).json({ message: "Book not found" });

  res.json(book);
};
