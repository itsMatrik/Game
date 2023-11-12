import React, {useState, useEffect} from 'react';
import DraggableBattery from "./draggableBattery";
import BatterySlot from "./batterySlot";
import styles from './batteryChangeGame.module.css'

const BatteryChangeGame = ({ onFinish }) => {
    const [batteries, setBatteries] = useState([
        { id: 1, isPlaced: false },
        { id: 2, isPlaced: false },
    ]);

    const handleDrop = (id) => {
        setBatteries((prevBatteries) =>
            prevBatteries.map((battery) =>
                battery.id === id ? { ...battery, isPlaced: true } : battery
            )
        );
    };

    useEffect(() => {
        if (batteries.every((battery) => battery.isPlaced)) {
            onFinish();
        }
    }, [batteries]);

    return (
        <div className={styles.root}>
            <BatterySlot/>
            {batteries.map((battery) => (
                <DraggableBattery
                    status={battery.isPlaced}
                    key={battery.id}
                    id={battery.id}
                    onDrop={handleDrop}
                />
            ))}
        </div>
    );
};

export default BatteryChangeGame;