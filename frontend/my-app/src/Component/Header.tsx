import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import icon from "../Assets/tinkedLogoSmall.png";
import leaderboard from "../Assets/leaderboard.png";
import redLeaderboard from "../Assets/leaderboard-select.png";
import profile from "../Assets/profile.png";
import redProfile from "../Assets/profile-select.png";

type prop = {
  red: string;
};

function Header({ red }: prop) {
  const navigate = useNavigate();
  return (
    <header id="Navbar">
      <button className="button" onClick={() => navigate("/swipe")}>
        <img src={icon} />
      </button>
      <button className="button" onClick={() => navigate("/leaderboard")}>
        {red === "leaderboard" ? (
          <img src={redLeaderboard} />
        ) : (
          <img src={leaderboard} />
        )}
      </button>
      <button className="button" onClick={() => navigate("/profile")}>
        {red === "profile" ? <img src={redProfile} /> : <img src={profile} />}
      </button>
    </header>
  );
}

export default Header;
