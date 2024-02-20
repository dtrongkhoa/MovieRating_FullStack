import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import ReviewDetail from "./ReviewDetail";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
} from "../../../../../data/repository";

//Review is limited to 600 characters
const MAX_REVIEW_LENGTH = 600;

function Review(props) {
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageReview, setErrorMessageReview] = useState(null);
  const [rating, setRating] = useState(0);
  const loggedUser = props.loggedUser;

  async function loadReviews() {
    const currentReviewList = await getReviews();
    // console.log(currentReviewList);
    setReviews(currentReviewList);
  }

  useEffect(() => {
    loadReviews();
  }, []);

  useEffect(() => {
    const initialAverRating = calculateAverageRating();
    props.getAverageRating(initialAverRating);
  }, [reviews]);

  //Track changing of star rating
  function handleRatingChange(event) {
    setRating(event);
  }

  //Delete a review
  async function handleDeleteReview(reviewID) {
    await deleteReview(reviewID).then(() => {
      loadReviews();
      const averRating = calculateAverageRating();
      props.getAverageRating(averRating);
    });
  }

  //Save a review after being edited
  async function handleSaveEdittedReview(reviewID, newReview) {
    await updateReview(newReview).then(() => {
      loadReviews();
      const averRating = calculateAverageRating();
      props.getAverageRating(averRating);
    });
    setErrorMessageReview(null);
  }
  //Submit a new review
  async function reviewSubmit(event) {
    event.preventDefault();
    // Trim the review text.
    const reviewTrimmed = review.trim();
    // Require login to leave a review
    if (loggedUser.username === "") {
      setErrorMessage("You need to login to leave a review");
      return;
    }
    // Require reviews to be less than 250 characters
    if (reviewTrimmed.length > MAX_REVIEW_LENGTH) {
      setErrorMessage("A review cannot exceed 600 characters.");
      return;
    }
    //Require reviews to not be empty
    if (reviewTrimmed === "") {
      setErrorMessage("A review cannot be empty.");
      return;
    }
    if (rating < 1) {
      setErrorMessage("Please leave a star rating!");
      return;
    }

    const newReviewToCreate = {
      text: reviewTrimmed,
      rating: rating,
      userID: loggedUser.userID,
      username: loggedUser.username,
      movieID: props.movie.movieID,
    };

    //Update the average review
    const averRating = calculateAverageRating();
    props.getAverageRating(averRating);

    // Create new Review to back-end
    try {
      await createReview(newReviewToCreate);
      setReviews([...reviews, newReviewToCreate]);
    } catch (e) {
      console.log(e);
    }

    // Reset review content.
    setRating(0);
    setReview("");
    setErrorMessage("");
  }

  //Calculate average rating
  function calculateAverageRating() {
    if (reviews.length > 0) {
      const targetReviewList = reviews.filter(
        (r) => r.movieID === props.movie.movieID
      );
      const totalRating = targetReviewList.reduce((acc, curReview) => {
        return acc + curReview.rating;
      }, 0);
      const averageRating = totalRating / targetReviewList.length;
      return averageRating;
    }
    return;
  }

  return (
    <div className="container">
      <div className="col-md-11">
        <form onSubmit={reviewSubmit}>
          <fieldset>
            <legend style={{ marginTop: "20px" }}>
              <lable htmlFor="review" className="control-label">
                New Review
              </lable>
            </legend>

            <div className="form-group" style={{ marginBottom: "60px" }}>
              <ReactQuill
                id="review"
                theme="snow"
                value={review}
                onChange={setReview}
                style={{ height: "180px", color: "black" }}
              />
            </div>
            {errorMessage !== null && (
              <div className="form-group">
                <span className="text-danger">{errorMessage}</span>
              </div>
            )}
            <div>
              <ReactStars
                count={5}
                size={35}
                value={rating}
                onChange={handleRatingChange}
              />
            </div>

            <div className="form-group">
              <input
                type="button"
                className="btn btn-danger col-md-2"
                value="Cancel"
                onClick={() => {
                  setReview("");
                  setErrorMessage(null);
                }}
              />
              <input
                type="submit"
                className="btn btn-primary col-md-2"
                value="Submit Review"
                style={{ marginLeft: "20px" }}
              />
            </div>
          </fieldset>
        </form>

        <hr />
        <h1>Reviews</h1>
        {errorMessageReview !== null && (
          <div className="form-group">
            <span className="text-danger">{errorMessageReview}</span>
          </div>
        )}
        <div>
          {reviews.length === 0 ? (
            <span className="text-muted">No reviews have been submitted.</span>
          ) : (
            reviews.map((perReview) => {
              if (perReview.movieID === props.movie.movieID)
                return (
                  <ReviewDetail
                    key={perReview.reviewID}
                    perReview={perReview}
                    loggedUser={loggedUser}
                    setErrorMessageReview={setErrorMessageReview}
                    handleSaveEdittedReview={handleSaveEdittedReview}
                    handleDeleteReview={handleDeleteReview}
                  />
                );
              return <div></div>;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Review;
