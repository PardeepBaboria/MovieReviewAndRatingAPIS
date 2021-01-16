const express = require('express');
const movieController = require('./../controllers/movieController');

const router = express.Router();

router.route('/:movieId/review-rating').post(movieController.createReviewAndRating);
router.route('/:movieId/review-rating').get(movieController.getReviewAndRating);

module.exports = router;