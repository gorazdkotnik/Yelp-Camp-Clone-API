const mongoose = require('mongoose');
const validator = require('validator');
const Comment = require('./comment');

const campgroundSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 20,
      validate(value) {
        const regex = /^[a-zA-Z0-9\s]{4,20}$/;

        if (!regex.test(value)) {
          throw new Error('Title can contain only letters and spaces');
        }
      },
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
      maxlength: 2500,
    },
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
    price: {
      type: Number,
      required: true,
      min: 1,
      max: 1000,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

campgroundSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'campground',
});

campgroundSchema.pre('deleteOne', { document: true }, async function (next) {
  const campground = this;
  await Comment.deleteMany({ campground: campground._id });
  next();
});

const Campground = mongoose.model('Campground', campgroundSchema);
module.exports = Campground;
