import React, {useState, useEffect} from 'react';
import styles from './fridgeGame.module.css';

const FridgeGame = ({ onFinish }) => {
    const [shelves, setShelves] = useState([
        { id: 0, targetTemp: Math.floor(Math.random() * 17) - 6, currentTemp: 0 },
        { id: 1, targetTemp: Math.floor(Math.random() * 17) - 6, currentTemp: 0 },
        { id: 2, targetTemp: Math.floor(Math.random() * 17) - 6, currentTemp: 0 },
        { id: 3, targetTemp: Math.floor(Math.random() * 17) - 6, currentTemp: 0 },
        { id: 4, targetTemp: Math.floor(Math.random() * 17) - 6, currentTemp: 0 },
        { id: 5, targetTemp: Math.floor(Math.random() * 17) - 6, currentTemp: 0 },
    ]);

    const handleTempChange = (id, change) => {
        setShelves(oldShelves => {
            return oldShelves.map(shelf => {
                if (shelf.id === id) {
                    return { ...shelf, currentTemp: shelf.currentTemp + change };
                } else {
                    return shelf;
                }
            });
        });
    };


    useEffect(() => {
        if (shelves.every(shelf => shelf.currentTemp === shelf.targetTemp)) {
            onFinish();
        }
    }, [shelves]);

    return (
        <div className={styles.root}>
            <div className={styles.inputs}>
                {shelves.map(shelf => (
                    <div key={shelf.id} className={styles.container}>
                        <div>
                            <div>required temperature: {shelf.targetTemp}</div>
                            <div>temperature now: {shelf.currentTemp}</div>
                        </div>
                        <div>
                            <button style={{backgroundColor: 'transparent', border: 'none'}} onClick={() => handleTempChange(shelf.id, -1)}><img style={{width: '100px'}} src={'https://drive.google.com/uc?export=view&id=1niS23aUBUrFQobhELrtmkbrECALolT-x'}/></button>
                            <button style={{backgroundColor: 'transparent', border: 'none'}} onClick={() => handleTempChange(shelf.id, 1)}><img style={{width: '100px'}} src={'https://drive.google.com/uc?export=view&id=1D3j0FZnQngxnDedOTsCBm3sa1cElv4f-'}/></button>
                        </div>
                    </div>
                ))}
            </div>
            <img style={{ width: '1000px' }} src={'https://drive.google.com/uc?export=view&id=1zNc0asMb68aZvsOVdMXzeiCrGkNtadbW'}/>
        </div>
    );
};


export default FridgeGame;