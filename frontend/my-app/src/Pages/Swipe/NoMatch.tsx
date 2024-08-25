import React from "react";
import "./NoMatch.css";
import nomatch from "../../Assets/rickroll.gif";
import { useNavigate } from "react-router-dom";

function NoMatch() {
  const navigate = useNavigate();
  const restart = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <section id="NoMatchInterface">
      <img style={{height: 300, width: 300, objectFit: 'contain'}} src={nomatch} />
      <p style={{ width: 700, textAlign: "center" }}>
        No match found. Have you considered a career in radio?
      </p>
      <button id="nextNoMatch" onClick={() => restart()}>
        RESTART
      </button>
    </section>
  );
}

export default NoMatch;
