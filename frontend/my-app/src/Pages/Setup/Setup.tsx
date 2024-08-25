import React from "react";
import "./Setup.css";
import { useNavigate } from "react-router-dom";
import logoBig from "../../Assets/tinkedLogoLarge.png";

function Setup() {
  const navigate = useNavigate();
  return (
    <section id="SetupInterface">
      <img
        src={logoBig}
        style={{ height: 100, width: 400, objectFit: "contain" }}
      />
      <div style={{display: "flex", flexDirection: 'column', gap: 24}}>
        <div className="Input">
          <p>Your name?</p>
          <input className="module-border-wrap" />
        </div>
        <div className="Input">
          <p>Your dream role?</p>
          <input className="module-border-wrap" />
        </div>
      </div>
      <button id="next" onClick={() => navigate("/photo")}>
        CONTINUE
      </button>
    </section>
  );
}

export default Setup;
