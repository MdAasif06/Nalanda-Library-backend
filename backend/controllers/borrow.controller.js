import Borrow from "../models/borrow.model.js";
import Book from "../models/book.model.js";

//    member → Borrow book

export const borrowBook = async (req, res) => {
  const { bookId } = req.body;

  // Book check
  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ message: "Book not found" });

  if (book.availableCopies <= 0)
    return res.status(400).json({ message: "Book not available" });

  // Borrow entry
  const borrow = await Borrow.create({
    user: req.user.id,
    book: bookId,
  });

  // Decrease available copies
  book.availableCopies -= 1;
  await book.save();

  res.status(201).json({
    success: true,
    message: "Book borrowed successfully",
    borrow,
  });
};

//    Member → Rrtuen Book

export const returnBook = async (req, res) => {
  const borrow = await Borrow.findById(req.params.id);
  if (!borrow)
    return res.status(404).json({ message: "Borrow record not found" });

  if (borrow.status === "returned")
    return res.status(400).json({ message: "Book already returned" });

  borrow.status = "returned";
  borrow.returnDate = new Date();
  await borrow.save();

  // Increase book copies
  const book = await Book.findById(borrow.book);
  book.availableCopies += 1;
  await book.save();

  res.json({
    success: true,
    message: "Book returned successfully",
  });
};

//  Uset → Borrow history

export const myBorrowHistory = async (req, res) => {
  const history = await Borrow.find({ user: req.user.id })
    .populate("book", "title author genre")
    .populate("user", "name email");

  res.json({
    success: true,
    count: history.length,
    history,
  });
};
