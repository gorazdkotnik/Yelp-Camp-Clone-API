const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    campground: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Campground',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
