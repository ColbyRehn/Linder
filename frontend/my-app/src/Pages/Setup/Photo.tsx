import React, { useState } from "react";
import "./Photo.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Webcam } from "@webcam/react";
import fireload from '../../Assets/tinderload.gif'

function Photo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, role } = location.state || {}; // Destructure the passed props
  const [photo, setPhoto] = useState<string>("");
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const onSubmit = () => {
    if (submitClicked) {
      return;
    }
    // Send photo to backend to generate bio
    setSubmitClicked(true);
    console.log("Sending photo to backend");
    const send = async () => {
      const response = await fetch("http://127.0.0.1:3456/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "image": photo,
          "name": name,
          "role": role,
        }),
      });
      if (response.ok) {
        const rtv = await response.json();
        // setup bio in local storage
        localStorage.setItem("bio", rtv.bio);
        localStorage.setItem("name", name);
        localStorage.setItem("img", photo);
        localStorage.setItem("role", role);
        localStorage.setItem("emotion", rtv.emotion);

        // Navigate to next page only when bio is resolved
        navigate("/preview")

        
      } else {
        setSubmitClicked(false);
        console.error("Failed to send photo");
      }
    }
    send();
    // Navigate to next page
    
  }
  return (
    <section id="Interface">
      {submitClicked ? <>
      <img src={fireload} style={{height: 300, width: 300, objectFit:"contain"}} />
      <p id="loading" >Generating your profile...</p>
      </> : <><h1>Upload profile</h1>
      {isPhotoTaken ? (
        <>
        {/*If photo taken, show preview */}
        <div id="Retake">
            <img src={photo} style={{borderRadius: 36, width: 600}} />
            <button className="retakephoto" onClick={() => {
                setIsPhotoTaken(false);
            }}>Re-take photo</button>
        </div>
        <button className="photonext" onClick={onSubmit}>{!submitClicked?"CONTINUE":"LOADING..."}</button>
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
      )}</>}
      
    </section>
  );
}

export default Photo;
