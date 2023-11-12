import { useDrag } from 'react-dnd';

const DraggableBattery = ({ id, onDrop, status }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'battery',
        item: { id },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                onDrop(item.id);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag} style={{ opacity: status ? 0.4 : 1}}>
            <img style={{ width: '400px' }} src={'https://drive.google.com/uc?export=view&id=1Nnrivzd-CdaZLbR9Q4SKc49rqO-HlO13'}/>
        </div>
    );
};

export default DraggableBattery