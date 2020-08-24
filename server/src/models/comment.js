/**
 * * Modules
 * * Imports
 */
const mongoose = require('mongoose');

/**
 * * Schema
 * * Comment
 */
const commentSchema = new mongoose.Schema(
  {
    // Description
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    // Campground
    campground: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Campground',
    },
    // Owner
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    // Config
    timestamps: true,
  }
);

// Model Comment and export it
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
