import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../App.css";
import { deleteReservation, getReservations } from "../../data/repository";

const Profile = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(props.user);
  var username = "";
  if (user !== null) {
    username = user.username;
  }

  const [editUserName, setEditUserName] = useState(username);
  const [password, setPassword] = useState(user.password);
  const [confirmPassword, setConfirmPassword] = useState(user.password);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [reservations, setReservations] = useState([]);

  async function loadReservations() {
    const reservationList = await getReservations();
    setReservations(reservationList);
  }

  useEffect(() => {
    loadReservations();
  }, []);

  useEffect(() => {
    if (!username) {
      navigate("/signin");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/users/${username}`);
        const data = await response.json();
        if (response.status === 200) {
          setUser(data);

          localStorage.setItem("user", JSON.stringify(data));
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage("Error fetching user details.");
      }
    };

    fetchUserDetails();
  }, [username, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      if (password !== confirmPassword) {
        setMessage("Password and Confirm Password are not matched!");
        return;
      }
      const updatedUser = {
        ...user,
        username: editUserName,
        password: password,
      };

      const response = await fetch(`/api/users/${username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      const data = await response.json();

      if (response.status === 200) {
        setMessage("Profile updated successfully.");
        props.updateUser(updatedUser);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Error updating profile.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`/api/users/${username}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log("Account deleted successfully on the server.");

        setTimeout(() => {
          // Clear authentication token
          localStorage.removeItem("authToken");
          console.log("Authentication token removed from local storage.");

          // Log the user out (update the state in App.js)
          props.logoutUser();
          console.log("Logged out user and updated state.");

          // Redirect to the sign-in page.
          console.log("Redirecting to sign-in page.");
          navigate("/signin");
        }, 500);
      } else {
        console.error("Error response from server:", data.message);
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Exception in handleDeleteAccount:", error.message);
      setMessage("Error deleting the account.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/users/${username}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.status === 200) {
        props.logoutUser();
        localStorage.clear();
        navigate("/signin");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Error deleting account.");
    }
  };

  async function handleDeleteReservation(reservationID) {
    await deleteReservation(reservationID).then(loadReservations());
  }

  return (
    <div style={{ backgroundColor: "#f5f6fa" }}>
      <div className="container justify-content-center">
        <div className="col-12 col-md-12">
          <div className="row bg-white">
            <div className="col-12">
              <h1 className="my-2 text-primary">Personal Details</h1>
            </div>
            {editMode ? (
              <div className="profile-edit-form">
                <label>Username:</label>
                <div>
                  <input
                    // type="text"
                    className="form-control"
                    value={editUserName}
                    onChange={(e) => setEditUserName(e.target.value)}
                  ></input>
                </div>

                <div className="mt-3">
                  <label>New Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                <div className="mt-3">
                  <label>Confirm Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                  />
                </div>
                <button onClick={handleSave} className="btn btn-primary">
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="btn btn-primary"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="profile-details">
                <div>
                  <label>Username:</label>
                  <p>{user.username}</p>
                </div>
                <button
                  onClick={() => setEditMode(true)}
                  className="btn btn-primary"
                >
                  Edit{" "}
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="btn btn-danger"
                  style={{ backgroundColor: "red" }}
                >
                  Delete Account
                </button>
              </div>
            )}
          </div>
          {message && <p>{message}</p>}
        </div>
      </div>
      {/* This is Kevin Form */}
      <div style={{ backgroundColor: "#f5f6fa" }}>
        <div>
          <div className="container justify-content-center">
            <div className="col-12 col-md-12 justify-content-center ">
              <div className="ml-md-4">
                <form>
                  <div className="row bg-white" style={{ marginTop: 10 }}>
                    <div className="col-12">
                      <h6 className="my-2 text-primary">Reservation</h6>
                    </div>

                    {reservations.length === 0 ? (
                      <div>You have no reservations!</div>
                    ) : (
                      reservations.map((reservation) => {
                        if (reservation.userID === user.userID) {
                          return (
                            <div className="row" style={{ border: 1 }}>
                              <div className="col-12 col-md-3">
                                <div className="form-group">
                                  <label className="control-label">Movie</label>
                                  <p>{reservation.movieTitle}</p>
                                </div>
                              </div>
                              <div className="col-12 col-md-3">
                                <div className="form-group">
                                  <label
                                    htmlFor="city"
                                    className="control-label"
                                  >
                                    Numer of Seats
                                  </label>
                                  <p>{reservation.seatNum}</p>
                                </div>
                              </div>
                              <div className="col-12 col-md-3">
                                <div className="form-group">
                                  <label
                                    htmlFor="city"
                                    className="control-label"
                                  >
                                    Session Time
                                  </label>
                                  <p>{reservation.session}</p>
                                </div>
                              </div>
                              <div className="col-12 col-md-3">
                                <button
                                  onClick={() =>
                                    handleDeleteReservation(
                                      reservation.reservationID
                                    )
                                  }
                                  className="btn btn-primary"
                                >
                                  Cancel Reservation
                                </button>
                              </div>
                            </div>
                          );
                        }
                      })
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
