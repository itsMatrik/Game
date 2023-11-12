import React, { useState, useEffect } from 'react';
import styles from './wireGame.module.css'

const WireGame = ({ onGameFinish }) => {
    const [wires, setWires] = useState([
        { color: 'red', connected: false },
        { color: 'blue', connected: false },
        { color: 'yellow', connected: false },
        { color: 'purple', connected: false },
        // добавь больше проводов по мере необходимости
    ]);

    const handleDrop = (event, color) => {
        event.preventDefault();
        const wireColor = event.dataTransfer.getData('color');
        if (wireColor === color) {
            setWires(wires.map(wire => wire.color === color ? { ...wire, connected: true } : wire));
        }
    };

    const handleDragStart = (event, color) => {
        event.dataTransfer.setData('color', color);
    };

    useEffect(() => {
        if (wires.every(wire => wire.connected)) {
            onGameFinish();
        }
    }, [wires, onGameFinish]);

    return (
        <div className={styles.root}>
            <div className={styles.background}>
                <div>
                    {wires.map((wire) => (
                        <div
                            className={styles.wire}
                            style={{ backgroundColor: wire.color }}
                            draggable
                            onDragStart={(event) => handleDragStart(event, wire.color)}
                        />
                    ))}
                </div>
                <div>
                    {wires.map((wire) => (
                        <div>
                            {wire.connected && (
                                <div
                                    className={styles.dopWire}
                                    style={{ backgroundColor: wire.color }}
                                />
                            )}
                            <div
                                className={styles.socket}
                                style={{ backgroundColor: wire.connected ? wire.color : 'gray' }}
                                onDrop={(event) => handleDrop(event, wire.color)}
                                onDragOver={(event) => event.preventDefault()}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WireGame;