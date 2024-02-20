import React from "react";
import { useState } from "react";
import { getReviews } from "../Data/repository";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ReviewTab.css";

function ReviewTab() {
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const reviewList = await getReviews();
    console.log(reviewList);
    setAllReviews(reviewList);
  };

  function handleDelete(reviewID) {}

  return (
    <div style={{ justifyContent: "center" }}>
      <h1 className="display-4">Reviews</h1>
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ReviewID</th>
              <th>Text</th>
              <th>Rating</th>
              <th>MovieID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allReviews.map((review) => (
              <tr key={review.reviewID}>
                <td>{review.reviewID}</td>
                <td dangerouslySetInnerHTML={{ __html: review.text }}></td>
                <td>{review.rating}</td>
                <td>{review.movieID}</td>

                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(review.reviewID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReviewTab;
