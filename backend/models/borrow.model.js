import mongoose from "mongoose";

/*
 Borrow Schema
 Relationship:
 user → User
 book → Book
*/
const borrowSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },
    borrowDate: {
      type: Date,
      default: Date.now
    },
    returnDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ["borrowed", "returned"],
      default: "borrowed"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Borrow", borrowSchema);
