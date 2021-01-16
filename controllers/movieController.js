const ReviewAndRaiting = require('./../models/reviewAndRaitingModel');

/**
 * API to get Movie reviews and comment by movie id with pagination.
 *
 * request -
 * param: movieId (movie object _id)
 * query: {skip default = 0, limit deafult = 20}
 * 
 * response - 
 *
 * if success -
 * - status =  success
 * - statusCode = 200 
 * - data = {  sorted (review and response of movie) descing order to date of creation of review and rating }
 * 
 * if app error
 * - status =  error
 * - statusCode = 500 
 * - message = error message
 */
exports.getReviewAndRating = async (req, res) => {
    try{
        const {movieId} = req.params;
        let {skip, limit} = req.query;
        skip = skip && typeof (skip * 1 ) == "number" ? skip * 1 : 0;
        limit = limit && typeof (limit * 1 ) == "number" ? limit * 1 : 20; 
        const data = await ReviewAndRaiting.find({movie: movieId}).skip(skip).limit(limit).sort({createdAt : -1});
        res.status(200).json({ status: "success", data });
    }catch(err){
        res.status(500).json({ status: "error", message: err.message });
    }
};

/**
 * API to create Movie reviews and comment by movie id.
 * 
 * request -
 * param: movieId (movie object _id)
 * body: {review, rating, reviewerEmail}
 * query: {skip, limit}
 * 
 *  validation conditons -
 *  - only one review and rating can be submit for movie from one email id. 
 *  - reating should be between 1 and 5
 * 
 * response - 
 * if success
 * - status =  success
 * - statusCode = 201 
 * - message = Data saved successfully!
 * 
 * if inavlid request
 * - status =  fail
 * - statusCode = 400 
 * - message = reason of invalidation
 * 
 * if app error
 * - status =  error
 * - statusCode = 500 
 * - message = error message
 *    
*/
exports.createReviewAndRating = async (req, res) => {
    try{
        const {movieId} = req.params;
        const {review, rating, reviewerEmail} = req.body;
        const isAlreadySubmit = await ReviewAndRaiting.findOne({movie: movieId, reviewerEmail});
        if(isAlreadySubmit){
            return res.status(400).json({ status: "fail", message:  `You already submit review for this movie!` });
        }
        await ReviewAndRaiting.create({movie: movieId, review, rating, reviewerEmail});
        return res.status(201).json({ status: "success", message: "Data saved successfully!" });
    }catch(error){
        //invalid request error handling
        if(error.name === 'CastError'){
            return res.status(400).json({ status: "fail", message: `Invalid ${error.path}: ${error.value}.` });
        }
        if(error._message && error._message.includes("validation")){
            return res.status(400).json({ status: "fail", message: error.message });
        }
        //app error
        return res.status(500).json({ status: "error", message: error.message });
    }
};