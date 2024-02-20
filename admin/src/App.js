import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserTab from "./components/Tabs/UserTab";
import ReviewTab from "./components/Tabs/ReviewTab";
import MovieTab from "./components/Tabs/MovieTab";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/users" element={<UserTab />} />
        <Route path="/reviews" element={<ReviewTab />} />
        <Route path="/movies" element={<MovieTab />} />
      </Routes>
    </Router>
  );
}

export default App;
