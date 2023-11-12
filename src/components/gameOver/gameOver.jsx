import React from 'react';
import styles from './gameOver.module.css'

const GameOver = ({score}) => {
    return (
        <div className={styles.root}>
            <div>GAME OVER!</div>
            <div>YOUR SCORE IS {score}</div>
        </div>
    );
};

export default GameOver;