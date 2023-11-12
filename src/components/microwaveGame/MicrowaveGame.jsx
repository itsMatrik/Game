import React, {useState, useEffect} from 'react';
import styles from './MicrowaveGame.module.css';

const MicrowaveGame = ({ onFinish }) => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [targetMinutes, setTargetMinutes] = useState(Math.floor(Math.random() * 2 + 1));
    const [targetSeconds, setTargetSeconds] = useState(Math.floor(Math.random() * 60));

    useEffect(() => {
        if (minutes === targetMinutes && seconds === targetSeconds) {
            onFinish();
        }
    }, [minutes, seconds]);

    return (
        <div className={styles.root}>
            <div>required time: {targetMinutes}:{targetSeconds}</div>
            <div>
                <div>
                    <button style={{backgroundColor: 'transparent', border: 'none'}} onClick={() => setMinutes(minutes + 1)}><img style={{width: '200px'}} src={'https://drive.google.com/uc?export=1D3j0FZnQngxnDedOTsCBm3sa1cElv4f-'}/></button>
                    <button style={{backgroundColor: 'transparent', border: 'none'}} onClick={() => setSeconds(seconds + 1)}><img style={{width: '200px'}} src={'https://drive.google.com/uc?export=1D3j0FZnQngxnDedOTsCBm3sa1cElv4f-'}/></button>
                </div>
                <div className={styles.time}>{minutes} : {seconds}</div>
                <div>
                    <button style={{backgroundColor: 'transparent', border: 'none'}} onClick={() => setMinutes(minutes - 1)}><img style={{width: '200px'}} src={'https://drive.google.com/uc?export=view&id=1niS23aUBUrFQobhELrtmkbrECALolT-x'}/></button>
                    <button style={{backgroundColor: 'transparent', border: 'none'}} onClick={() => setSeconds(seconds - 1)}><img style={{width: '200px'}} src={'https://drive.google.com/uc?export=view&id=1niS23aUBUrFQobhELrtmkbrECALolT-x'}/></button>
                </div>
            </div>
        </div>
    );
};



export default MicrowaveGame;