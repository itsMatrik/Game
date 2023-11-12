import { useState, useEffect } from 'react';
import styles from './stoveGame.module.css'
const StoveGame = ({ onFinish }) => {
    const [stoves, setStoves] = useState([
        { id: 1, value: 0, img: 'https://drive.google.com/uc?export=view&id=1JBYNySidwwsN0cGjSbyCKTqW3m0lt0jc' },
        { id: 2, value: 0, img: 'https://drive.google.com/uc?export=view&id=1JBYNySidwwsN0cGjSbyCKTqW3m0lt0jc' },
        { id: 3, value: 0, img: 'https://drive.google.com/uc?export=view&id=1JBYNySidwwsN0cGjSbyCKTqW3m0lt0jc' },
        { id: 4, value: 0, img: 'https://drive.google.com/uc?export=view&id=1JBYNySidwwsN0cGjSbyCKTqW3m0lt0jc' },
    ]);

    const [isFoodDropped, setIsFoodDropped] = useState(false);

    const [selectedFood, setSelectedFood] = useState(null);
    const [targetStove, setTargetStove] = useState(Math.floor(Math.random() * 4) + 1);
    const [targetValue, setTargetValue] = useState(Math.floor(Math.random() * 10));

    const handleDrop = (id) => {
        setSelectedFood({ stove: id, value: targetValue });
        // Если еда перетаскивается на правильную плиту, установите isFoodDropped в true
        if (id === targetStove) {
            setIsFoodDropped(true);
        }
    };

    const handleKnobChange = (id, value) => {
        setStoves(stoves.map(stove => stove.id === id ? { ...stove, value: Number(value) } : stove));
    };

    useEffect(() => {
        if (selectedFood && selectedFood.stove === targetStove && stoves.find(stove => stove.id === selectedFood.stove && stove.value === selectedFood.value)) {
            onFinish();
        }
    }, [stoves, selectedFood, targetStove]);

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.text}>
                    <div>Plate number: {targetStove}</div>
                    <div>Required power: {targetValue}</div>
                </div>
                <div className={styles.flexV}>
                    <div className={styles.plita}>
                        {stoves.map(stove => (
                            <div style={{height: '400px'}} key={stove.id} onDrop={() => handleDrop(stove.id)} onDragOver={(event) => event.preventDefault()}>
                                <img style={{ width: '400px'}} src={stove.img} alt={`Конфорка ${stove.id}`} />
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className={styles.inputs}>
                            {stoves.map(stove => (
                                <input className={styles.input} key={stove.id} type="range" min="0" max="10" value={stove.value} onChange={(e) => handleKnobChange(stove.id, e.target.value)} />
                            ))}
                        </div>
                    </div>
                </div>
                <img style={{ width: '800px', display: isFoodDropped ? 'none' : 'block' }} src='https://drive.google.com/uc?export=view&id=1Q7AkWuF9myL6p4aW6sb-XaWgPf6SGzph' draggable onDragStart={() => setSelectedFood(null)} alt='Еда' />
            </div>
        </div>
    );
};

export default StoveGame;