import React, { useState } from "react";
import "./Photo.css";
import { useNavigate } from "react-router-dom";
import { Webcam } from "@webcam/react";

function Photo() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<string>("");
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);

  return (
    <section id="Interface">
      <h1>Upload profile</h1>
      {isPhotoTaken ? (
        <>
        {/*If photo taken, show preview */}
        <div id="Retake">
            <img src={photo} />
            <button onClick={() => {
                setIsPhotoTaken(false);
            }}>Re-take photo</button>
        </div>
        </>
      ) : (
        <>
        {/*Video preview before taking photo*/}
        <Webcam mirrored>
          {({ getSnapshot }) => (
            <button
              onClick={() => {
                // Base 64 encoded image
                const snapshot = getSnapshot({ quality: 0.8 });
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
      <button onClick={() => navigate("/swipe")}>Next</button>
    </section>
  );
}

export default Photo;
