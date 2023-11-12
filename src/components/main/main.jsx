import styles from './main.module.css'
import Card from "../card/card";
import React, {useState, useEffect, useRef} from "react";
import BatteryChangeGame from "../batteryGameChange/batteryChangeGame";
import KettleGame from "../kettleGame/kettleGame";
import MicrowaveGame from "../microwaveGame/MicrowaveGame";
import StoveGame from "../stoveGame/stoveGame";
import FridgeGame from "../fridgeGame/fridgeGame";
import GameOver from "../gameOver/gameOver";
import WireGame from "../circuitGame/wireGame";

const Main = () => {
    const [cards, setCards] = useState([
        {
            id: 0,
            name: "clocks",
            power: 40,
            energy: 250,
            is_on: true,
            progressbar: 100,
            decrement: 12,
            isGameActive: false,
            position: 80
        },
        {
            id: 1,
            name: "kettle",
            power: 40,
            energy: 250,
            is_on: true,
            isGameActive: false,
            position: 30,
            progressbar: 1,
            decrement: 0,
            is_boiling: false
        },
        {
            id: 2,
            name: "microwave",
            power: 40,
            energy: 250,
            is_on: true,
            isGameActive: false,
            position: 38,
            progressbar: 100,
            decrement: 8
        },
        {
            id: 3,
            name: "oven",
            power: 40,
            energy: 250,
            is_on: true,
            isGameActive: false,
            position: 5,
            progressbar: 100,
            decrement: 11
        },
        {
            id: 4,
            name: "fridge",
            power: 40,
            energy: 250,
            is_on: true,
            isGameActive: false,
            position: 48,
            progressbar: 100,
            decrement: 11
        },
        {
            id: 5,
            name: "wires",
            power: 40,
            energy: 250,
            is_on: true,
            isGameActive: false,
            position: 64,
            progressbar: 100,
            decrement: 11
        },
    ]);

    const [activeElement, setActiveElement] = useState(null);
    const [characterPosition, setCharacterPosition] = useState(0);

    const [boilTime, setBoilTime] = useState(Math.random() * (40 - 10) + 20);
    const timerId = useRef(null);
    const [hero, setHero] = useState('/robot.png');

    const [score, setScore] = useState(0);

    const [gameOver, setGameOver] = useState(false);

    const winSound = new Audio('/win2.mp3');

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!gameOver) {
                setScore(oldScore => oldScore + 50);
            }
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, [gameOver]);


    useEffect(() => {
        const newCards = [...cards];
        const kettleIndex = newCards.findIndex((card) => card.name === 'kettle');

        timerId.current = setTimeout(() => {
            newCards[kettleIndex].is_boiling = true;
            setCards(newCards);
            setBoilTime(Math.random() * (40 - 10) + 10);
        }, boilTime * 1000);

        return () => clearTimeout(timerId.current);
    }, [boilTime]);


    const moveCharacter = (direction) => {
        setCharacterPosition(oldPosition => {
            let newPosition = oldPosition + direction;

            // Проверка границ
            if (newPosition < 0) {
                newPosition = 0;
            } else if (newPosition > 80) { // Измени на 80, чтобы учесть ширину персонажа (20vw)
                newPosition = 80;
            }

            const newActiveElement = cards.find(card => card.position === newPosition);
            setActiveElement(newActiveElement);

            if (activeElement && activeElement.position !== newPosition) {
                const newCards = [...cards];
                const index = newCards.findIndex((card) => card.id === activeElement.id);
                newCards[index].isGameActive = false;
                setCards(newCards);
            }

            return newPosition;
        });
    };


    useEffect(() => {
        let hero = '/robot.png'
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'a':
                    moveCharacter(-1);
                    setHero('/robot_reverse.png');
                    break;
                case 'd':
                    moveCharacter(1);
                    setHero('/robot.png');
                    break;
                default:
                    break;
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [moveCharacter]);
    useEffect(() => {
        let intervalId;
        intervalId = setInterval(() => {
            const newCards = [...cards];
            newCards.forEach((card) => {
                if (card.is_on) {
                    if (card.progressbar > 0) {
                        card.progressbar -= card.decrement;
                    } else {
                        setGameOver(true)
                    }
                }
            });
            setCards(newCards);
        }, 5000);
        return () => {
            clearInterval(intervalId);
        };
    }, [cards]);

    const toggleStatus = (id) => {
        const newCards = [...cards];
        const index = newCards.findIndex((card) => card.id === id);
        newCards[index].isGameActive = true;
        setCards(newCards);
    };

    const handleGameFinish = (id) => {
        const newCards = [...cards];
        const index = newCards.findIndex((card) => card.id === id);
        newCards[index].isGameActive = false;
        if (newCards[index].name === 'kettle') {
            newCards[index].is_boiling = false;
        } else {
            newCards[index].progressbar = 100;
        }
        setCards(newCards);
        winSound.play();
    };
    return (
        <div className={styles.root}>
            {gameOver ? (
                <GameOver score={score}/>
            ) : (
                <div>
                    <div className={styles.background}>
                        <img src={hero} style={{
                            position: 'absolute',
                            left: `${characterPosition}vw`, // Используй vw для позиционирования
                            bottom: '35vh', // Используй vh для позиционирования снизу
                            width: '20vw', // Используй vw для размера
                            height: '35vh', // Используй vh для высоты
                            overflow: 'hidden'
                        }}/>
                    </div>
                    <div className={styles.down}>
                        {cards.map(function (card) {
                            return (
                                <div className={styles.button}>
                                    {Math.abs(characterPosition - card.position) <= 3 && (
                                        card.name === 'kettle' && !card.is_boiling ? (
                                            <div className={styles.kettle_off}>Kettle is not ready</div>
                                        ) : (
                                            <Card
                                                image={card.img}
                                                name={card.name}
                                                status={card.is_on}
                                                id={card.id}
                                                progress={card.name === 'kettle' ? 'kettle is ready' : 'energy ' + card.progressbar}
                                                toggleStatus={toggleStatus}
                                                kettle={card.is_boiling}
                                            />
                                        )
                                    )}
                                    {card.isGameActive && Math.abs(characterPosition - card.position) <= 3 && (
                                        card.name === 'clocks' ?
                                            <BatteryChangeGame onFinish={() => handleGameFinish(card.id)}/> :
                                            card.name === 'kettle' ?
                                                <KettleGame onFinish={() => handleGameFinish(card.id)}/> :
                                                card.name === 'microwave' ?
                                                    <MicrowaveGame onFinish={() => handleGameFinish(card.id)}/> :
                                                    card.name === 'oven' ?
                                                        <StoveGame onFinish={() => handleGameFinish(card.id)}/> :
                                                        card.name === 'fridge' ?
                                                            <FridgeGame onFinish={() => handleGameFinish(card.id)}/> :
                                                            card.name === 'wires' ?
                                                                <WireGame onGameFinish={() => handleGameFinish(card.id)}/> :
                                                                    null
                                    )}
                                </div>
                            );
                        })}
                        <div className={styles.score}>
                            <div>SCORE</div>
                            <div>{score}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Main;