import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(username, password) {
  const response = await axios.get(API_HOST + "/api/users/login", {
    params: { username, password },
  });
  const user = response.data;

  // NOTE: In this example the login is also persistent as it is stored in local storage.
  if (user !== null) setUser(user);

  return user;
}

async function findUser(id) {
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

async function updateUser(user) {
  const response = await axios.put(API_HOST + "/api/users/update", user);

  return response.data;
}

// --- Review ---------------------------------------------------------------------------------------
async function getReviews() {
  const response = await axios.get(API_HOST + "/api/reviews");

  return response.data;
}

async function createReview(review) {
  const response = await axios.post(API_HOST + "/api/reviews", review);

  return response.data;
}

async function updateReview(review) {
  const response = await axios.put(API_HOST + "/api/reviews", review);
  return response.data;
}

async function deleteReview(reviewID) {
  const response = await axios.put(
    API_HOST + `/api/reviews/delete/${reviewID}`
  );
  return response.data;
}
// --- Movie ---------------------------------------------------------------------------------------
async function getMovies() {
  try {
    const response = await axios.get(API_HOST + "/api/movies");
    if (response && response.data) {
      return response.data;
    } else {
      console.error("Unexpected response structure:", response);
      return null;
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return null;
  }
}
// --- Reservation ---------------------------------------------------------------------------------------
async function getReservations() {
  const response = await axios.get(API_HOST + "/api/reservations");

  return response.data;
}

async function createReservation(reservation) {
  const response = await axios.post(
    API_HOST + "/api/reservations",
    reservation
  );

  return response.data;
}

async function deleteReservation(reservationID) {
  const response = await axios.put(
    API_HOST + `/api/reservations/delete/${reservationID}`
  );
  return response.data;
}

// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser,
  findUser,
  createUser,
  updateUser,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  getUser,
  removeUser,
  getMovies,
  createReservation,
  getReservations,
  deleteReservation,
};
