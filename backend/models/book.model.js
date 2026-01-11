import mongoose from "mongoose";


  // Book Schema
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    author: {
      type: String,
      required: true,
      trim: true
    },

    genre: {
      type: String,
      required: true,
      trim: true
    },

    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    availableCopies: {
      type: Number,
      required: true,
      min: 0,
      default: 1
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Book", bookSchema);
