import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header id="Navbar">
      <button onClick={() => navigate("/swipe")}>Logo</button>
      <button onClick={() => navigate("/leaderboard")}>Leaderboard</button>
      <button onClick={() => navigate("/profile")}>Profile</button>
    </header>
  );
}

export default Header;
