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
            <img style={{ width: "700px"}} src={"/clocks.png"}/>
        </div>
    );
};

export default BatterySlot;

