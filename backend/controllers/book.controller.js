import Book from "../models/book.model.js";


  //  admin: Create book

export const createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};


  //  admin: Update book

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

  //  admin: Delete Book 

export const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book)
    return res.status(404).json({ message: "Book not found" });

  res.json({ message: "Book deleted successfully" });
};


  //  all users: Get all books

export const getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};


  //  all Users: Get book by id

export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book)
    return res.status(404).json({ message: "Book not found" });

  res.json(book);
};
