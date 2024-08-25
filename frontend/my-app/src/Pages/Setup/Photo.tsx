import React, { useState } from "react";
import "./Photo.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Webcam } from "@webcam/react";

function Photo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, role } = location.state || {}; // Destructure the passed props
  const [photo, setPhoto] = useState<string>("");
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const onSubmit = () => {
    // Send photo to backend to generate bio
    setSubmitClicked(true);
    const send = async () => {
      const response = await fetch("http://127.0.0.1:3456/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: photo,
          name: name,
          role: role,
        }),
      });
      if (response.ok) {
        
        const bio = await response.json();
        navigate("/swipe", { state: {bio:bio.bio} });
        // fetch the db
        const response2 = await fetch("http://localhost:3456/bosses")
          if (response2.ok) {
            const db = await response2.json();
            
          } else {
            console.error("Failed to fetch data");
          }
        
      } else {
        console.error("Failed to send photo");
      }
    }
    send();
    // Navigate to next page
    
  }
  return (
    <section id="Interface">
      <h1>Upload profile</h1>
      {isPhotoTaken ? (
        <>
        {/*If photo taken, show preview */}
        <div id="Retake">
            <img src={photo} style={{borderRadius: 36, width: 600}} />
            <button className="retakephoto" onClick={() => {
                setIsPhotoTaken(false);
            }}>Re-take photo</button>
        </div>
        <button className="photonext" onClick={() => navigate("/preview")}>CONTINUE</button>
        </>
      ) : (
        <>
        {/*Video preview before taking photo*/}
        <Webcam mirrored style={{borderRadius: 36, width: 600}}>
          {({ getSnapshot }) => (
            <button
            className="photonext"
              onClick={() => {
                // Base 64 encoded image
                const snapshot = getSnapshot({ quality: 1 });
                console.log(snapshot)
                if (snapshot !== undefined) {
                    setPhoto(snapshot);
                    setIsPhotoTaken(true);
                }
              }}
            >
              Take photo
            </button>
          )}
        </Webcam>
        </>
      )}
    </section>
  );
}

export default Photo;
