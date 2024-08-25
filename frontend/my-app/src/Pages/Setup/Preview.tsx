import React, { useState }  from "react";
import "./Preview.css";
import { useNavigate } from "react-router-dom";
import PreviewProfile from "../../Component/PreviewProfile";


function Preview() {
 const navigate = useNavigate();
  return (
    <section id="PreviewInterface">
        <PreviewProfile />
        <button style={{marginTop: 48}} id="next" onClick={() => navigate("/swipe")}>
        START MATCHING
      </button>
    </section>
  );
}

export default Preview;
