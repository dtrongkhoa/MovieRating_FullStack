import "./Movie.css";
import { Link } from "react-router-dom";

// Movie related configurations
function Movie(props) {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12  d-flex">
      <div className="card">
        <div style={{ height: 350 }}>
          <img
            src={props.movie.Poster}
            alt="abc"
            className="card-img-top img-fluid mh-100"
          ></img>
        </div>
        <div className=" card-body ">
          <h3 className="card-title">{props.movie.Title}</h3>
          <p className="card-text">{props.movie.Plot}</p>
        </div>
        <h4 className="card-text detail-button">
          <Link
            to={{
              pathname: "/movie",
              data: { loadMovies: props.loadMovies },
            }}
            state={{ movie: props.movie }}
          >
            Details
          </Link>
        </h4>
      </div>
    </div>
  );
}

export default Movie;
