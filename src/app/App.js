//App.js

import "./styles.css";
import "./app.css";
import Image from 'next/image';
import { useState, useEffect } from "react";
import Player from "./Player.js";

export default function App() {
  const [login, setLogin] = useState(false);
  const [startes, setStartes] = useState({
    money: 10,
    name: ""
  });

  const handleInputChange = (e) => {
    const input = e.target.value;
    if (!isNaN(input) && input > 0 && input < 1000000) {
      setStartes({ ...startes, money: input });
    }
  };

  if (login) {
    return (
      <>
      <div className="app">
        <button className="buttonNav" onClick={() => setLogin(false)}>
          <span>Выйти </span>
        </button>
        <Player startes={startes} />
      </div>  
      </>
    );
  } else {
    return (
      <>
        <div className="app">
          <Image className="logoimage" src="/logo.jpg" width={500}
        height={500} alt="background" />
          <p className="ui-text-p">
            Это игра в блекджек. Введи стартовое количество монет, свое имя и
            начни игру.
          </p>

          <div className="start-block">
            <input
              className="ui-input-money"
              type="number"
              placeholder="Введи количество монеток"
              min="10"
              max="1000000"
              step="1"
              value={startes.money}
              onChange={handleInputChange}
            />
            
            <input
              className="ui-input-name"
              type="text"
              placeholder="Имя"
              value={startes.name}
              onChange={(e) => setStartes({ ...startes, name: e.target.value })}
            />
          
          
          <button className="buttonNav1" onClick={() => setLogin(true)}>
            <span>Играть </span>
          </button>
          </div>
        </div>
      </>
    );
  }
}