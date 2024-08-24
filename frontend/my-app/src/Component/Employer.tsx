import React from "react";
import "./Employer.css";

type prop = {
  image: string;
  fullName: string;
  age: string;
  location: string;
  distance: string;
  bio: string;
};

const Employer = ({image, fullName, age, location, distance, bio}: prop) => {
  return (
    <div id="Photocard" style={{backgroundImage: "url('" + image.replace(/(\r\n|\n|\r)/gm, "") + "')"}} className="Image">
      <div id="Info">
        <div id="NameInfo">
          <p id="Name">{fullName}</p>
          <p id="Age">{age}</p>
        </div>
        <div id="Content">
          <p className="text">Lives in {location}</p>
          <p className="text">{distance}km from you</p>
          <p className="text">{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Employer;
