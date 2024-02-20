import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/UserPages/Signup";
import Signin from "./components/UserPages/Signin";
import Profile from "./components/UserPages/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import MainPage from "./components/MainPage/MainPage";
import MovieItem from "./components/MainPage/Movies/MovieItem/MovieItem";
import Footer from "./components/Footer/Footer";
import { getUser, removeUser } from "./data/repository";

const App = () => {
  const [user, setUser] = useState(getUser());
  const [userName, setUserName] = useState("");

  const loginUser = (user) => {
    setUser(user);
    setUserName(user.username);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const logoutUser = () => {
    removeUser();
    setUserName("");
    setUser(null);
  };

  return (
    <Router>
      <Header logoutUser={logoutUser} user={user}></Header>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MainPage />
            </>
          }
        />
        <Route path="/signup" element={<Signup loginUser={loginUser} />} />
        <Route path="/signin" element={<Signin loginUser={loginUser} />} />
        <Route
          path="/profile"
          element={
            <Profile
              user={user}
              updateUser={updateUser}
              logoutUser={logoutUser}
            />
          }
        />
        <Route
          path="/movie"
          element={
            <MovieItem
              user={user}
              userName={userName}
              logoutUser={logoutUser}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
