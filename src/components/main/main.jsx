import styles from './main.module.css'
import Card from "../card/card";
import React, {useState, useEffect, useRef, useCallback} from "react";
import BatteryChangeGame from "../batteryGameChange/batteryChangeGame";
import KettleGame from "../kettleGame/kettleGame";
import MicrowaveGame from "../microwaveGame/MicrowaveGame";
import StoveGame from "../stoveGame/stoveGame";
import FridgeGame from "../fridgeGame/fridgeGame";
import GameOver from "../gameOver/gameOver";
import WireGame from "../circuitGame/wireGame";

const createCard = (id, name, position, decrement) => ({
    id,
    name,
    is_on: true,
    isGameActive: false,
    position,
    progressbar: 100,
    decrement,
});

const Main = () => {
    const [cards, setCards] = useState([
        createCard(0, "clocks", 80, 15),
        createCard(1, "kettle", 30, 0),
        createCard(2, "microwave", 38, 8),
        createCard(3, "oven", 5, 11),
        createCard(4, "fridge", 48, 13),
        createCard(5, "wires", 64, 16),
    ]);

    const [activeElement, setActiveElement] = useState(null);
    const [characterPosition, setCharacterPosition] = useState(0);

    const [boilTime, setBoilTime] = useState(Math.random() * (40 - 10) + 20);
    const timerId = useRef(null);
    const [hero, setHero] = useState('https://drive.google.com/uc?export=view&id=1BfWCrlZEEh7-cehOZu2kpUmQv20XZlS4');

    const [score, setScore] = useState(0);

    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!gameOver) {
                setScore(oldScore => oldScore + 50);
            }
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

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

    const moveCharacter = useCallback((direction) => {
        setCharacterPosition(oldPosition => {
            let newPosition = oldPosition + direction;

            if (newPosition < 0) {
                newPosition = 0;
            } else if (newPosition > 80) {
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
    }, [cards, activeElement]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'a':
                case 'ф':
                    moveCharacter(-1);
                    setHero('https://drive.google.com/uc?export=view&id=1yeHzXK8zpLQx6KET5jDYlQPXag8TOVzt');
                    break;
                case 'd':
                case 'в':
                    moveCharacter(1);
                    setHero('https://drive.google.com/uc?export=view&id=1BfWCrlZEEh7-cehOZu2kpUmQv20XZlS4');
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
    }, []);

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
                            left: `${characterPosition}vw`,
                            bottom: '35vh',
                            width: '20vw',
                            height: '35vh',
                            overflow: 'hidden'
                        }}/>
                    </div>
                    <div className={styles.down}>
                        {cards.map(function (card) {
                            return (
                                <div>
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