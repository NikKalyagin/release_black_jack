//App.js

import "./styles.css";
import "./app.css";
import Image from 'next/image';
//import '/Users/nikka/release_black_jack/public/Oi-Regular.woff';
//import WebFont from 'webfontloader';

import { useState, useEffect } from "react";
import Player from "./Player.js";

export default function App() {
  const [login, setLogin] = useState(false);
  const [startes, setStartes] = useState({
    money: 10,
    name: ""
  });


/*загружаем шрифт. Вернее, уже Не загружаем)
useEffect(() => {
  WebFont.load({
    google: {
      families: ['Oi', 'Press Start 2P']
    }
  });
 }, []);
*/
  const handleInputChange = (e) => {
    const input = e.target.value;
    if (!isNaN(input)) {
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
              placeholder="Введи количество монеток"
              value={startes.money}
              onChange={handleInputChange}
            />
            
            <input
              className="ui-input-name"
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