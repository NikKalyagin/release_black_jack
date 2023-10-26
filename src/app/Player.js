//Player.js
import React, { useState } from "react";
import "./styles.css";
import Rules from "./Rules";
import Dealer from "./Dealer";

export default function Player({ startes }) {
  const [showRules, setShowRules] = useState(false);

  const toggleRules = () => {
    setShowRules(!showRules);
  };

  return (
    <>
      
      <button className="buttonRules" onClick={toggleRules}>
        Правила
      </button>
      {showRules && <Rules />}
      <div> </div>
      <Dealer startes={startes} />
      
    </>
  );
}
