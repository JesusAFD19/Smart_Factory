import { Draggable } from 'react-beautiful-dnd';

export const Drag = (props) => {
  return (
    <Draggable draggableId={props.draggableId} index={props.index}>
        {(provided) => (

        <div
            id={`drag_${props.id}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            {props.item}
        </div>
        )}

    </Draggable>
  )
}
