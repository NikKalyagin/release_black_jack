//Rules.js

import React from "react";
import "./styles.css";
const Rules = () => {
  return (
    <div className="ruleContainer">
      <h1 className="h1">Правила игры:</h1>
      <p></p>
      <p className="h1text">
        1) Ваша цель - обыграть дилера. Это можно сделать, набрав больше очков, чем дилер, но менее, чем 21.
      </p>
      <p className="h1text">
        2) Значения очков каждой карты: от двойки до десятки — от 2 до 10
        соответственно, у туза — 1 или 11 (11 пока общая сумма не больше 21,
        далее 1), у т. н. картинок (король, дама, валет) — 10.
      </p>   
      <p className="h1text">
        3) В начале игры вы и дилер получаете по 2 карты. Вторая карта дилера скрыта пока вы не закончите играть.
      </p>    
      <h2 className="h2">
        У вас есть набор  кнопок: -   
      <span><button className="buttonexample">start</button></span>   Начинает игру</h2>
      <p className="h1text">
        1) Чтобы начать, введите свою ставку и начните игру!
      </p>
      <p className="h2text">
        Вы можете: взять карту <span><button className="buttonexample">hit</button></span> или отказаться брать карту <span><button className="buttonexample">stop</button></span>
      </p>
      <p className="h3text">
        Вы можете: удвоить ставку <span><button className="buttonexample">double</button></span> и взять только ОДНУ карту!
      </p>
      <p className="h1text">
        2) После вашей игры играет дилер. Он проверяет наличие у себя БлекДжека, если его нет, то он может добрать карты пока его счет не станет 16 и БОЛЕЕ! После этого дилер не имеет брать карты. 
      </p>
      <p></p>
      <h1 className="h1">
        Наступило время подсчитать очки и выплатить выигрыши!  
      </h1>
      <p className="h1text">
        1) Если у Игрока БлекДжек (21), а у Дилера нет - выплата 3 к 2 от ставки. </p>
      <p className="h1text">  
        2) Если у Игрока меньше 21, но больше, чем у Дилера, то ставка выплачивается в двойном размере. </p>
      <p className="h1text">
        3) Если у Игрока и Дилера одинаковое количество очков - то ставка возвращается Игроку </p>
      <p className="h1text">
        4) Если у Игрока больше 21, или меньше очков, чем у Дилера, то Игрок проиграл - ставку забирает казино! </p>
      <p></p>
      <h1 className="h1">
        Нажмите кнопку <span><button className="buttonexample">next</button></span> чтобы начать следующую раздачу
      </h1>
    </div>
  );
};

export default Rules;