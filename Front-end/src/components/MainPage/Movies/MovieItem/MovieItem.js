import { useLocation } from "react-router-dom";
import NumericInput from "react-numeric-input";
import "./MovieItem.css";
import Review from "./Review/Review";
import { useEffect, useState } from "react";
import { createReservation } from "../../../../data/repository";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () => toast("Success! Please check your profile");
const fix_session = ["Mon 2pm", "Wed 10am"];

function MovieItem(props) {
  const [inputSeat, setInputSeat] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [session, setSession] = useState(fix_session[0]);

  const location = useLocation();
  const { movie } = location.state;
  const [rating, setRating] = useState(0);

  const user = props.user;

  useEffect(() => {}, [rating]);

  function getAverageRating(averageRating) {
    if (averageRating > 0) {
      const averRating = Math.round(averageRating * 100) / 100;
      setRating(averRating);
      return;
    }
  }
  async function onBookingPress(event) {
    event.preventDefault();

    if (user === null) {
      setErrorMessage("Please login to book tickets!");
      return;
    }
    //Create a reservation
    const newReservationToCreate = {
      userID: user.userID,
      movieID: movie.movieID,
      movieTitle: movie.Title,
      seatNum: inputSeat,
      session: session,
    };

    try {
      await createReservation(newReservationToCreate);
      setInputSeat(0);
      notify();
      props.location.data.loadMovies();
    } catch (e) {
      console.log(e);
    }

    setErrorMessage(null);
  }
  return (
    <div>
      <div className="container movie-item-container">
        <div className="container-fluid">
          <div className="row">
            <div className="preview col-md-5 justify-content-center">
              <div className="preview-pic tab-content">
                <div className="tab-pane active " id="pic-1">
                  <img src={movie.Poster} alt={movie.Title} />
                </div>
              </div>
            </div>

            <div className="col-md-7">
              <h1 className="product-title">{movie.Title}</h1>
              <span>Released: {movie.Released}</span>
              <h5 className="product-author">Actors: {movie.Actors} </h5>

              <p className="product-description">{movie.Plot}</p>
              <div>
                <h3>
                  Rating:{" "}
                  <span className="badge bg-dark rounded-pill">{rating} </span>
                </h3>
              </div>

              <h4>
                Time:
                {/* <span>2.30pm - 4.30pm</span> */}
                <select
                  value={session}
                  onChange={(e) => {
                    setSession(e.target.value);
                  }}
                >
                  <option>{fix_session[0]}</option>
                  <option>{fix_session[1]}</option>
                </select>
              </h4>
              <div className="action">
                <NumericInput
                  min={0}
                  max={movie.Seats}
                  value={inputSeat}
                  color="white"
                  onChange={(value) => setInputSeat(value)}
                ></NumericInput>
                <span
                  className="btn btn-primary"
                  type="submit"
                  //Call the function addToCart to add the product to cart
                  onClick={onBookingPress}
                >
                  Book Movie
                </span>
                <p>We have {movie.Seats} seats left</p>
              </div>
              {errorMessage !== null && (
                <div className="form-group">
                  <span className="text-danger">{errorMessage}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Review
        key={movie.movieID}
        loggedUser={props.user}
        movie={movie}
        getAverageRating={getAverageRating}
        movieItemRating={rating}
      />
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default MovieItem;
