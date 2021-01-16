const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A movie must have a name'],
      maxlength: [255, 'A movie name must have less or equal then 40 characters'],
      minlength: [1, 'A movie name must have more or equal then 10 characters']
    },
    ratingsAverage: {
      type: Number,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number
    }
  }
);

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;