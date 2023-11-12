import { useDrop } from 'react-dnd';

const BatterySlot = () => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'battery',
        drop: () => console.log('Battery dropped'),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    return (
        <div ref={drop}>
            <img style={{ width: "700px"}} src={"https://drive.google.com/uc?export=view&id=1-YCo2UReUsFIftCmD4atag63_xUP2cwA"}/>
        </div>
    );
};

export default BatterySlot;

