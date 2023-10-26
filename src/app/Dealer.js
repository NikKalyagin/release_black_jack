//Dealer.js
/*- 3-я попытка- Функция перессчета общей суммы заменена на useEffect
- useEffect применен для игры дилера
- стабильная версия*/
import "./styles.css";
import Image from 'next/image';
import { useState, useEffect } from "react";
//
export default function Dealer({ startes }) {
  const [dealerCards, setDealerCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerBlackJack, setDealerBlackJack] = useState(false);
  const [dealerLose, setDealerLose] = useState(false);
  const [dealerWin, setDealerWin] = useState(false);
  const [scoreEq, setScoreEq] = useState(false);
  const [dealerPlaying, setDealerPlaying] = useState(false);
  const [hiddenSecCard, setHiddenSecCard] = useState(false);
  const [playerBlackJack, setPlayerBlackJack] = useState(false);
  const [currentBid, setCurrentBid] = useState(1);
  const [buttonStart, setButtonStart] = useState(false);
  const [buttonHit, setButtonHit] = useState(true);
  const [buttonStop, setButtonStop] = useState(true);
  const [buttonDouble, setButtonDouble] = useState(true);
  const [buttonNext, setButtonNext] = useState(true);
  const [gotCredit, setGotCredit] = useState(0);
  const [playerLose, setPlayerLose] = useState(false);
  const [playerWin, setPlayerWin] = useState(false);
  const [loseCredit, setLoseCredit] = useState(false);
  //записать полученые пропсы
  useEffect(() => {
    setGotCredit(startes.money);
  }, [startes.money]);
  //получение карт игрока и дилера -->
  // 1) функция создания карты дилера
  const getDealerCard = () => {
    const cards = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "В",
      "Д",
      "К",
      "Т"
    ];
    const suits = ["пики", "черви", "бубны", "трефы"];

    const getRandomCard = () => {
      const randomCard = cards[Math.floor(Math.random() * cards.length)];
      const randomSuit = suits[Math.floor(Math.random() * suits.length)];
      return `${randomCard} ${randomSuit}`;
    };
    setDealerCards((prevDealerCards) => {
      const newDCard = getRandomCard();
      return [...prevDealerCards, newDCard];
    });
  };
  // 2) функция создания карты игрока
  const getPlayerCard = () => {
    const cards = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "В",
      "Д",
      "К",
      "Т"
    ];
    const suits = ["пики", "черви", "бубны", "трефы"];

    const getRandomCard = () => {
      const randomCard = cards[Math.floor(Math.random() * cards.length)];
      const randomSuit = suits[Math.floor(Math.random() * suits.length)];
      return `${randomCard} ${randomSuit}`;
    };
    setPlayerCards((prevPlayerCards) => {
      const newPCard = getRandomCard();
      return [...prevPlayerCards, newPCard];
    });
  };
  //закончена функция создания карт
  //функция пересчета текста в значение: Дилер
  useEffect(() => {
    let aceCount = 0;
    let score = 0;

    dealerCards.forEach((card) => {
      const value = card.split(" ")[0];
      if (value === "Т") {
        aceCount++;
      } else if (["В", "Д", "К"].includes(value)) {
        score += 10;
      } else {
        score += parseInt(value) || 0;
      }
    });

    for (let i = 0; i < aceCount; i++) {
      if (score + 11 > 21) {
        score += 1;
      } else {
        score += 11;
      }
    }

    setDealerScore(score);
  }, [dealerCards]);

  // функция пересчета текста в значение: Игрок
  useEffect(() => {
    let aceCount = 0;
    let score = 0;

    playerCards.forEach((card) => {
      const value = card.split(" ")[0];
      if (value === "Т") {
        aceCount++;
      } else if (["В", "Д", "К"].includes(value)) {
        score += 10;
      } else {
        score += parseInt(value) || 0;
      }
    });

    for (let i = 0; i < aceCount; i++) {
      if (score + 11 > 21) {
        score += 1;
      } else {
        score += 11;
      }
    }

    setPlayerScore(score);
  }, [playerCards]);

  //функция добора дилером карт (триггер - кнопка стоп). Дилер добирает карты и обсчитывает их через useEffect, который самотриггерится по: 1) статусу, что дилер играет,2) по росту счета дилера. Если счет дилера 16 и более, то эффект триггерится, но меняется статус "игра дилера", что перестает вызывать эффект
  //useEffect(() => {},[])  заготовка useEffect
  useEffect(() => {
    if (dealerPlaying && dealerScore < 16) {
      getDealerCard();
      let aceCount = 0;
      let score = 0;
      dealerCards.forEach((card) => {
        const value = card.split(" ")[0];
        if (value === "Т") {
          aceCount++;
        } else if (["В", "Д", "К"].includes(value)) {
          score += 10;
        } else {
          score += parseInt(value) || 0;
        }
      });
      for (let i = 0; i < aceCount; i++) {
        if (score + 11 > 21) {
          score += 1;
        } else {
          score += 11;
        }
      }
      setDealerScore(score);
    } else if (dealerScore >= 16) {
      setDealerPlaying(false);
    }
  }, [dealerScore, dealerPlaying]);
  // Итог кода выше: Есть функции получения карт дилера, игрока. Обсчет счета происходит по триггеру получения новой карты, через useEffect
  // Логика игры. Стартуем с КНОПКИ СТАРТ!
  // Про кнопку Старт: значение менее 1 пользователь не сможет ввести. Если у игрока мало денег - будет статус. Если у игрока нет денег чтобы удвоить ставку, то кнопка Дабл будет неактивна

  function handleButtonStart() {
    if (
      gotCredit > 0 &&
      gotCredit - currentBid >= 0 &&
      gotCredit - currentBid * 2 >= 0
    ) {
      setLoseCredit(false);
      getDealerCard();
      getDealerCard();
      getPlayerCard();
      getPlayerCard();

      setButtonDouble(false);
      setButtonStop(false);
      setButtonStart(true);
      setButtonHit(false);
    } else if (gotCredit > 0 && gotCredit - currentBid >= 0) {
      setLoseCredit(false);
      getDealerCard();
      getDealerCard();
      getPlayerCard();
      getPlayerCard();

      setButtonDouble(true);
      setButtonStop(false);
      setButtonStart(true);
      setButtonHit(false);
    } else {
      setLoseCredit(true);
    }
  }

  function handleButtonHit() {
    setButtonDouble(true);
    getPlayerCard();
  }

  function handleButtonDouble() {
    setCurrentBid(currentBid * 2);
    getPlayerCard();
    setButtonDouble(true);
    setButtonHit(true);
    setButtonStop(true);
    handleButtonStop();
  }

  //Функция для определения статусов игроков. Тут происходит важная механика игры. Игрок играет сам, до дилера. Если у игрока "перебор", то кнопка Стоп деактивируется. И дилер играть уже не будет (это не важно - игрок проиграл). При это показывается скрытая карта дилера, чтобы понять что игра была честной
  useEffect(() => {
    if (playerScore === 21) {
      setPlayerBlackJack(true);
    } else {
      setPlayerBlackJack(false);
    }
    if (dealerScore === 21 && buttonStop === true) {
      setDealerBlackJack(true);
    } else {
      setDealerBlackJack(false);
    }
    if (
      playerScore === dealerScore &&
      playerScore !== 0 &&
      buttonStop === true
    ) {
      setScoreEq(true);
    } else {
      setScoreEq(false);
    }
    if (playerScore > 21) {
      setPlayerLose(true);
      setDealerWin(true);
      setButtonHit(true);
      setButtonStop(true);
      setButtonNext(false);
      setHiddenSecCard(true);
    } else {
      setPlayerLose(false);
    }
    if (dealerScore > 21 && buttonStop === true) {
      setDealerLose(true);
      setPlayerWin(true);
    } else {
      setDealerLose(false);
    }
    if (dealerScore <= 21 && dealerScore > playerScore && buttonStop === true) {
      setDealerWin(true);
      setPlayerLose(true);
    } else {
      setDealerWin(false);
    }
    if (playerScore <= 21 && playerScore > dealerScore && buttonStop === true) {
      setPlayerWin(true);
      setDealerLose(true);
    } else {
      setPlayerWin(false);
    }
  }, [playerScore, dealerScore, buttonStop]);

  // функция для определения выплат (старая, работала плохо)
  /*function loseOrWin() {
    if (playerLose === true) {
      const bid = parseInt(currentBid);
      setGotCredit((prevCredit) => parseInt(prevCredit) - bid);
    }
    if (dealerLose === true && playerBlackJack === false) {
      const bid = parseInt(currentBid);
      setGotCredit((prevCredit) => parseInt(prevCredit) + bid);
    }
    if (playerBlackJack === true && dealerBlackJack === false) {
      const bid = parseInt(currentBid);
      setGotCredit(
        (prevCredit) =>
          parseFloat(prevCredit) + parseFloat(((bid / 2) * 3).toFixed(2))
      );
    }
  }*/
  //функция для корректного рассчета выплат (десятичные)
  function loseOrWin() {
    if (playerLose === true) {
      const bid = parseFloat(currentBid);
      setGotCredit((prevCredit) => parseFloat(prevCredit) - bid);
    }
    if (dealerLose === true && playerBlackJack === false) {
      const bid = parseFloat(currentBid);
      setGotCredit((prevCredit) => parseFloat(prevCredit) + bid);
    }
    if (playerBlackJack === true && dealerBlackJack === false) {
      const bid = parseFloat(currentBid);
      setGotCredit(
        (prevCredit) =>
          parseFloat(prevCredit) + parseFloat(((bid / 2) * 3).toFixed(2))
      );
    }
  }

  function handleButtonStop() {
    setButtonDouble(true);
    setButtonHit(true);
    setButtonStop(true);
    setDealerPlaying(true);

    setButtonNext(false);
    setHiddenSecCard(true);
  }

  function handleButtonNext() {
    loseOrWin();
    setButtonNext(true);
    setButtonStart(false);
    setDealerScore(0);
    setPlayerScore(0);
    setDealerCards([]);
    setPlayerCards([]);
    setHiddenSecCard(false);
    setDealerBlackJack(false);
    setPlayerBlackJack(false);
    setScoreEq(false);
    setPlayerLose(false);
    setPlayerWin(false);
    setDealerLose(false);
    setDealerWin(false);
  }

  // Ниже расположена отрисовка игры
  // функция замены карт для финального вывода:
  const prettyPrintCards = (card) => {
    const mapSuits = {
      пики: "♠",
      черви: "♡",
      бубны: "♢",
      трефы: "♣"
    };
    return card.replace(
      /пики|черви|бубны|трефы/g,
      (matched) => mapSuits[matched]
    );
  };

  return (
    <div className="game">
      <div className="container">
      <div className="gameHello">
      <Image className="logoimage1" src="/logo.jpg" width={200}
        height={200} alt="background" />
      <h2>Привет, {startes.name}</h2>
      <p>Начальная ставка от 1 $</p>
      <input
          type="number"
          className="ui-input-money"
          placeholder="1"
          disabled={buttonStart}
          value={currentBid}
          onChange={(e) => {
            const value = e.target.value;
            const newBid = value < 1 ? 1 : value;
            setCurrentBid(newBid);
          }}
      />
      <p>Ваш кредит: {gotCredit}</p>
      <p>Ваша ставка: {currentBid}</p>
      <div className="buttonblock">
      <button className="gamebutton" disabled={buttonStart} onClick={handleButtonStart}>
        Start
      </button>

      <button className="gamebutton" disabled={buttonHit} onClick={handleButtonHit}>
        Hit
      </button>
      <button className="gamebutton" disabled={buttonStop} onClick={handleButtonStop}>
        Stop
      </button>
      <button className="gamebutton" disabled={buttonDouble} onClick={handleButtonDouble}>
        Double
      </button>
      <button className="gamebutton" disabled={buttonNext} onClick={handleButtonNext}>
        Next
      </button>
      </div>
      </div>
      <div className="statuszone"> 
      <div className="dealerLeft">
        <h3>Дилер</h3>
      
      <div>
        {hiddenSecCard ? (
          <>
            <p>Карты дилера: <span className="cards"> {dealerCards.map(prettyPrintCards).join("   ")}</span></p>
            <p>Счет дилера: {dealerScore}</p>
          </>
        ) : (
          <p>
            Карты дилера:{" "} <span className="cards">
            {dealerCards.length > 0 ? prettyPrintCards(dealerCards[0]) : ""}</span>
          </p>
        )}
      </div>
      <div className="statuses">
        <div>{dealerBlackJack ? <p>BLACK JACK!!!</p> : ""}</div>
        <div>{scoreEq ? <p>Статус: Ровно!</p> : ""}</div>
        <div>{dealerLose ? <p>Статус: Дилер проиграл!</p> : ""}</div>
        <div>{dealerWin ? <p>Статус: Дилер выиграл!</p> : ""}</div>
      </div>
      </div>
        
        
      <div className="playerRight">
      <h3>Игрок</h3>
      <div className="global">
        <p>Карты игрока: <span className="cards">{playerCards.map(prettyPrintCards).join("   ")}</span></p>

        <p>Счет игрока: {playerScore}</p>
        <div className="statuses">
          <div>{loseCredit ? <p>Статус: У вас нет столько денег</p> : ""}</div>
          <div>{playerBlackJack ? <p>BLACK JACK!!!</p> : ""}</div>
          <div>{scoreEq ? <p>Статус: Ровно! Ставка возвращена</p> : ""}</div>
          <div>
            {playerLose ? (
              <p>Статус: Игрок проиграл! Ставка уходит казино</p>
            ) : (
              ""
            )}
          </div>
          <div>{playerWin ? <p>Статус: Игрок выиграл!</p> : ""}</div>
        </div>
      </div>
      </div>
      </div>
      </div> 
    </div>
  );
}
