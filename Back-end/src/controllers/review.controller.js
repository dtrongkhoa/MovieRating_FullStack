const db = require("../database");

// Select all reviews from the database.
exports.all = async (req, res) => {
  try {
    const reviews = await db.review.findAll();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all reviews." });
  }
};

// Create a review in the database.
exports.create = async (req, res) => {
  const review = await db.review.create({
    text: req.body.text,
    rating: req.body.rating,
    userID: req.body.userID,
    username: req.body.username,
    movieID: req.body.movieID,
  });

  res.json(review);
};

// Update a review in the database
exports.updateReview = async (req, res) => {
  const review = await db.review.findByPk(req.body.reviewID);

  //Update Review's fields
  review.text = req.body.text;
  review.rating = req.body.rating;

  await review.save();

  res.json(review);
};

exports.deleteReview = async (req, res) => {
  try {
    const reviewToDelete = await db.review.findByPk(req.params.reviewID);

    if (reviewToDelete) {
      await reviewToDelete.destroy();
      res.json({ message: "Review deleted successfully." });
    } else {
      res.status(404).json({ message: "There are some errors!" });
    }
  } catch (e) {
    res.status(500).json({ message: "Error deleting the review." });
  }
};
