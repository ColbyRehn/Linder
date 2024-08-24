import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import linder from '../Assets/tinderload.gif'

function Header() {
  const navigate = useNavigate();
  return (
    <header id="Navbar">
      <button onClick={() => navigate("/swipe")}><img src={linder} style={{height: 48, width: 48}} /></button>
      <button onClick={() => navigate("/leaderboard")}>Leaderboard</button>
      <button onClick={() => navigate("/profile")}>Profile</button>
    </header>
  );
}

export default Header;
