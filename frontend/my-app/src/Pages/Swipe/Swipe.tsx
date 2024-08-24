import React, { useState, useRef, useMemo, useEffect, useCallback } from "react";
import Header from "../../Component/Header";
import Employer from "../../Component/Employer";
import "./Swipe.css";
import sample from "../../Assets/sample.jpg";
import TinderCard from "react-tinder-card";
import { relative } from "path";

const db = [
  {
    image: sample,
    name: "0",
    age: "60",
    location: "Sydney",
    distance: "50",
    bio: "Hello",
  },
  {
    image: sample,
    name: "1",
    age: "60",
    location: "Sydney",
    distance: "50",
    bio: "Hello",
  },
  {
    image: sample,
    name: "2",
    age: "60",
    location: "Sydney",
    distance: "50",
    bio: "Hello",
  },
];

function Swipe() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState("");
  const currentIndexRef = useRef(currentIndex);

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
    []
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction: string, nameToDelete: string, index: number) => {
    console.log(direction);
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
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
      <Header />
      <button onClick={() => swipe('left')}>Swipe left!</button>
      <button onClick={() => swipe('right')}>Swipe right!</button>
      <div style={{height: 580,
  width: 400}}>
        {db.map((character, index) => (
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
    </section>
  );
}

export default Swipe;
