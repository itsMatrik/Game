import React from "react";
import styles from './card.module.css'
const Card = ({ name, toggleStatus, id, progress }) => {
    return (
        <div>
            <div>
                <div className={styles.buttonContainer}>
                    <div className={styles.name}>{name}</div>
                    <button className={styles.button}
                            onClick={() => {
                                toggleStatus(id);
                            }}
                    >
                        <img style={{ width: '60%' }} src="/knopka.png" onClick={() => {
                            toggleStatus(id);
                        }}/>
                    </button>
                    <div className={styles.progress}>{progress}</div>
                </div>
            </div>
        </div>
    );
};


export default Card;
