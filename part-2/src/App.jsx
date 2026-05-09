import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Board from "./Board";
import About from "./About";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/">Game</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;