import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

function ReviewDetail(props) {
  const [editMode, setEditMode] = useState(false);
  const newReview = props.perReview;
  const [newRating, setNewRating] = useState(props.perReview.rating);
  const loggedUser = props.loggedUser;
  const perReview = props.perReview;
  const reviewUserName = perReview.username;
  const reviewID = perReview.reviewID;
  const [editReviewText, setEditReviewText] = useState(props.perReview.text);

  useEffect(() => {}, [props.perReview]);

  function handleRatingChange(event) {
    setNewRating(event);
  }

  function handleEditMode() {
    if (loggedUser.username === reviewUserName) {
      props.setErrorMessageReview("");
      setEditMode(true);
      return;
    }
    props.setErrorMessageReview("You need to login/ This is not your reviews!");
  }

  function handleSaveEditReview(e) {
    e.preventDefault();

    const reviewToUpdate = {
      reviewID: newReview.reviewID,
      text: editReviewText,
      rating: newRating,
      userID: newReview.userID,
      username: newReview.username,
      movieID: newReview.movieID,
    };
    props.handleSaveEdittedReview(reviewID, reviewToUpdate);
    setEditMode(false);
  }

  function handleDeleteReview(e) {
    e.preventDefault();
    props.handleDeleteReview(reviewID);
    setEditMode(false);
  }

  return (
    <div className="border my-3 p-3" style={{ whiteSpace: "pre-wrap" }}>
      <h3 className="text-primary">{perReview.username}</h3>
      <div>
        <ReactStars
          count={5}
          size={15}
          value={newRating}
          isEdit={editMode}
          onChange={handleRatingChange}
        />
      </div>

      {editMode === false ? (
        <div>
          <div dangerouslySetInnerHTML={{ __html: newReview.text }}></div>
          <button
            className="btn btn-primary btn-sm myFloat_Right"
            onClick={handleEditMode}
          >
            Edit
          </button>
        </div>
      ) : (
        <div>
          <ReactQuill
            theme="snow"
            value={editReviewText}
            onChange={setEditReviewText}
            style={{ height: "180px", color: "black", marginBottom: "60px" }}
          />
          <button
            className="btn btn-primary btn-sm myFloat_Right"
            onClick={handleDeleteReview}
          >
            Delete
          </button>
          <button
            className="btn btn-primary btn-sm myFloat_Right"
            onClick={handleSaveEditReview}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default ReviewDetail;
