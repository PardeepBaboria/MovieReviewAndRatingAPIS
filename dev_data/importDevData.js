const fs = require('fs');
const mongoose = require('mongoose');
const Movie = require('./../models/movieModel');
const ReviewAndRaiting = require('./../models/reviewAndRaitingModel');

/**
 * Get connection to mongoDb.
 */
const DB = process.env.DATABASE || "mongodb://localhost:27017/mrarApp";

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const movies = JSON.parse(fs.readFileSync(`${__dirname}/movieData.json`, 'utf-8'));
const reviewAndRaitings = JSON.parse(fs.readFileSync(`${__dirname}/reviewAndRaitingData.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Movie.create(movies);
    await ReviewAndRaiting.create(reviewAndRaitings);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Movie.deleteMany();
    await ReviewAndRaiting.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}