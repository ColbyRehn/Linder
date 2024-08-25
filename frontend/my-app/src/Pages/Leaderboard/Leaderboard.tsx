import React from "react";
import Header from "../../Component/Header";
import sample from "../../Assets/sample.jpg";
import "./Leaderboard.css";

const db = [{
  image: sample,
  name: 'bob',
  number: 100
},{
  image: sample,
  name: 'bob',
  number: 90
},{
  image: sample,
  name: 'bob',
  number: 80
}];

function Leaderboard() {
  return (
    <section id="leaderboardinterface">
      <Header red="leaderboard" />
      <div id="topleaderboard">
        <div id="secondplace" className="placement">
          <div className="profile">
            <img src={db[1].image} />
            <p>{db[1].name}</p>
          </div>
          <div id="secondpodium">
            <b>
              <p>2nd</p>
            </b>
            <p>{db[1].number} swipes</p>
          </div>
        </div>
        <div id="firstplace" className="placement">
          <div className="profile">
            <img src={db[0].image} />
            <p>{db[0].name}</p>
          </div>
          <div id="firstpodium">
            <b>
              <p>1st</p>
            </b>
            <p>{db[0].number} swipes</p>
          </div>
        </div>
        <div id="thirdplace" className="placement">
          <div className="profile">
            <img src={db[2].image} />
            <p>{db[2].name}</p>
          </div>
          <div id="thirdpodium">
            <b>
              <p>3rd</p>
            </b>
            <p>{db[2].number} swipes</p>
          </div>
        </div>
      </div>
      <div id="restleaderboard">
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <p>Name</p>
          <p>Rank</p>
          <p>Matches</p>
        </div>
        {db.map((element, index) => (
          <div key={index} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div className="profile" style={{flexDirection: 'row'}}>
              <img src={element.image} />
              <p>{element.name}</p>
            </div>
            <p>
              {index + 1}
            </p>
            <p>{element.number}</p>
          </div>
          ))}
      </div>
    </section>
  );
}

export default Leaderboard;
