import React from "react";
import { Routes, Route, Link } from "react-router-dom";

const Home: React.FC = () => <h1>Home</h1>;
const About: React.FC = () => <h1>About</h1>;

const App: React.FC = () => {
  return (
    <div>
      <nav>
      <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;