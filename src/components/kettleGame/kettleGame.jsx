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
            <img style={{width: '700px' }} src="https://drive.google.com/uc?export=1Syvnd9aL0_xLZZaRctpP_XMm5eL67A4X" alt="Чайник" />
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
            <img style={{width: '400px'}}  src="https://drive.google.com/uc?export=view&id=12vIRKuO6BsazKASeTJ7oc3OYXXh8Heup" alt="Кружка" />
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
