import React, { useState, useRef, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../Component/Header";
import Employer from "../../Component/Employer";
import "./Swipe.css";
import sample from "../../Assets/sample.jpg";
import TinderCard from "react-tinder-card";
import left from "../../Assets/left.png";
import right from "../../Assets/right.png";



function Swipe() {
  const navigate = useNavigate();
  // const db = [
  //   {
  //     image: sample,
  //     name: "0",
  //     age: "60",
  //     location: "Sydney",
  //     distance: "50",
  //     bio: "Hello",
  //   },
  //   {
  //     image: sample,
  //     name: "1",
  //     age: "60",
  //     location: "Sydney",
  //     distance: "50",
  //     bio: "Hello",
  //   },
  //   {
  //     image: sample,
  //     name: "2",
  //     age: "60",
  //     location: "Sydney",
  //     distance: "50",
  //     bio: "Hello",
  //   },
  // ];
  // const location = useLocation();
  //const { db, bio } = location.state || {}; // Destructure the passed props

  const [db, setDb] = useState<any[]>([]);
  const [firstLoad, setFirstLoad] = useState(false);
  // get bio from local storage

  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState("");
  const currentIndexRef = useRef(currentIndex);



  // fetch info
  useEffect(() => {
    const fetchInfo = async () => {
      const response = await fetch("http://localhost:3456/bosses");
      if (response.ok) {
        const dbinfo = await response.json();
        setDb(dbinfo);
        setCurrentIndex(dbinfo.length - 1);
        setFirstLoad(true);
      } else {
        console.error("Failed to fetch data");
      }
    };
    fetchInfo();
  }, []);

  const handleUserKeyPress = (event: any) => {
    const { key, keyCode } = event;
    if(keyCode === 37){
      swipe('left');
    } else if (keyCode === 39) {
      swipe('right');
    }
};

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
        window.removeEventListener("keydown", handleUserKeyPress);
    };
}, [handleUserKeyPress]);


  const childRefs: React.RefObject<any>[] = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    [db]
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction: string, nameToDelete: string, index: number) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);


    const request_swipe = async (direction:string) => {
      const response = await fetch("http://localhost:3456/swipe_boss", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "boss_id": db[index].id,
          "direction": direction,
          "emotion": localStorage.getItem("emotion")
        }),
      });
      if (!response.ok) {
        console.error("Failed to send swipe");
      } else {
        const x = await response.json();
        if (x.success) {
          navigate("/match");
        }
        else {
          if (index === 0) {
            navigate("/nomatch");
          }
      }
      }
    }

    // logic for swipe
    request_swipe(direction)

    
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx &&
      childRefs[idx].current &&
      childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir: string) => {
    if (
      canSwipe &&
      currentIndex < db.length &&
      childRefs[currentIndex].current
    ) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <section id="SwipeInterface">
      <Header red=""/>
      {firstLoad ? (
      <div id="swipeContent">
      <button onClick={() => swipe('left')}><img src={left}/><p id='swipe'>Pass</p></button>
      <div style={{height: 580,
  width: 400}}>
        {db.map((character:any, index:any) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={index}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
            preventSwipe={['up', 'down']}
          >
            <Employer
              key={index}
              image={character.image}
              fullName={character.name}
              age={character.age}
              location={character.location}
              distance={character.distance}
              bio={character.bio}
            />
          </TinderCard>
        ))}
      </div>
      <button onClick={() => swipe('right')}><img src={right}/><p id='match'>Match</p></button>
      </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </section>
  );
}

export default Swipe;
