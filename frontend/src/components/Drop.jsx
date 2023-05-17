import { DragDropContext } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '../helpers/StrictModeDroppable'

export const Drop = (props) => {

    const reorder = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        return result
    }

    const handleOnDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        if (
            source.index === destination.index &&
            source.droppableId === destination.droppableId
        ) {
            return;
        }        
        const updatedPieces = reorder(props.items, source.index, destination.index);
        props.setItems(updatedPieces);
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>

            <Droppable
                droppableId='droppable' direction={props.direction}>{(provided) => (
                    
                    <div
                    className='droppable'
                    style={{
                        display: 'flex',
                        flexDirection: props.direction === 'vertical' ? 'column' : 'row'
                    }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}>

                    {props.dragItems}   

                    {provided.placeholder}
                </div>
                )}

            </Droppable>

        </DragDropContext>
    )
}

