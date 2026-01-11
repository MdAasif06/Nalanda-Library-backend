// controllers/report.controller.js
import Book from "../models/book.model.js";
import Borrow from "../models/borrow.model.js";

export const mostBorrowedBooks = async (req, res) => {
  const report = await Borrow.aggregate([
    {
      $group: {
        _id: "$book",
        totalBorrows: { $sum: 1 }
      }
    },
    { $sort: { totalBorrows: -1 } },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "book"
      }
    },
    { $unwind: "$book" }
  ]);

  res.json(report);
};

export const mostActiveMembers = async (req, res) => {
  const report = await Borrow.aggregate([
    {
      $group: {
        _id: "$user",
        totalBorrows: { $sum: 1 }
      }
    },
    { $sort: { totalBorrows: -1 } },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" }
  ]);

  res.json(report);
};


export const bookAvailabilityReport = async (req, res) => {
  const books = await Book.find();

  let totalBooks = books.length;
  let totalCopies = 0;
  let availableCopies = 0;

  books.forEach(book => {
    totalCopies += book.totalCopies;
    availableCopies += book.availableCopies;
  });

  res.json({
    totalBooks,
    totalCopies,
    borrowedBooks: totalCopies - availableCopies,
    availableBooks: availableCopies
  });
};

