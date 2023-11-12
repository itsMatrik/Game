import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styles from './kettleGame.module.css'

const Kettle = () => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'kettle',
        item: { name: 'Kettle' },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0 : 1 }}>
            <img style={{width: '700px' }} src="/chainik.png" alt="Чайник" />
        </div>
    );
};

const Cup = ({ onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'kettle',
        drop: onDrop,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div ref={drop} style={{ borderRadius: '20px', backgroundColor: isOver ? 'lightgreen' : 'orangered' }}>
            <img style={{width: '400px'}}  src="/kruzka.png" alt="Кружка" />
        </div>
    );
};

const KettleGame = ({ onFinish }) => {
    const handleDrop = () => {
        onFinish(); // Закрываем мини-игру
    };

    return (
        <div className={styles.root}>
            <Cup onDrop={handleDrop} />
            <Kettle />
        </div>
    );
};

export default KettleGame;
