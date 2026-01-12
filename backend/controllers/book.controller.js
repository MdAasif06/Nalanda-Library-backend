import Book from "../models/book.model.js";

//  admin: Create book
export const createBook = async (req, res) => {
  try {
    // const book = await Book.create(req.body);
    const {
      title,
      author,
      isbn,
      genre,
      publicationDate,
      availableCopies,
      totalCopies,
    } = req.body;
    const book = new Book({
      title,
      author,
      isbn,
      genre,
      publicationDate,
      availableCopies,
      totalCopies,
    });
    const createdBook = await book.save();
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: createdBook,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create book",
      error: error.message,
    });
  }
};

//  admin: Update book
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update book",
      error: error.message,
    });
  }
};

//  admin: Delete Book
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete book",
      error: error.message,
    });
  }
};

//  all users: Get all books

// export const getAllBooks = async (req, res) => {
//   const books = await Book.find();
//   res.json(books);
// };
export const getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;

    const query = {};

    if (author) {
      query.author = { $regex: author, $options: "i" };
    }

    if (genre) {
      query.genre = { $regex: genre, $options: "i" };
    }

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalBooks = await Book.countDocuments(query);

    res.status(200).json({
      success: true,
      totalBooks,
      currentPage: Number(page),
      totalPages: Math.ceil(totalBooks / limit),
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch books",
      error: error.message,
    });
  }
};

//  all Users: Get book by id

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid book ID or failed to fetch book",
      error: error.message,
    });
  }
};
