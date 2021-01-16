const mongoose = require('mongoose');
const Movie = require('./movieModel');
const validator = require('validator');

const reviewAndRaitingSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    movie: {
      type: mongoose.Schema.ObjectId,
      ref: 'Movie',
      required: [true, 'Review must belong to a Movie.']
    },
    reviewerEmail: {
      type: String,
      required: [true, 'Please provide your email'],
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    }
  }
);

reviewAndRaitingSchema.statics.calcAverageRatings = async function (movieId) {
  const stats = await this.aggregate([
    {
      $match: { movie: movieId }
    },
    {
      $group: {
        _id: '$movie',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await Movie.findByIdAndUpdate(movieId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  }
};

reviewAndRaitingSchema.post('save', function () {
  // this points to current review
  this.constructor.calcAverageRatings(this.movie);
});

const Review = mongoose.model('ReviewAndRaiting', reviewAndRaitingSchema);

module.exports = Review;