/**
 * * Modules
 * * Imports
 */
const mongoose = require('mongoose');
const validator = require('validator');
const Comment = require('./comment');

/**
 * * Schema
 * * Campground
 */
const campgroundSchema = new mongoose.Schema(
  {
    // Title
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 20,
      validate(value) {
        const regex = /^[a-zA-Z0-9\s]{4,20}$/;

        if (!regex.test(value)) {
          throw new Error(
            'Title can contain only alphanumeric characters and spaces'
          );
        }
      },
    },
    // Description
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
      maxlength: 2500,
    },
    // Image
    image: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error('Invalid image URL');
        }
      },
    },
    // Price
    price: {
      type: Number,
      required: true,
      min: 1,
      max: 1000,
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
    toJSON: { virtuals: true },
  }
);

/**
 * * Virtual Comments Property
 */
campgroundSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'campground',
});

/**
 * * Delete Comments before deleting Campground
 */
campgroundSchema.pre('deleteOne', { document: true }, async function (next) {
  const campground = this;
  await Comment.deleteMany({ campground: campground._id });
  next();
});

// Model Campground and export it
const Campground = mongoose.model('Campground', campgroundSchema);
module.exports = Campground;
