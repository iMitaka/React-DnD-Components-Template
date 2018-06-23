import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const getItemStyle = (isDragging, draggableStyle, itemsBaseStyles, itemsBackgroundColors) => {
    itemsBackgroundColors = itemsBackgroundColors || { default: 'grey', isDragging: 'lightgreen' }
    return ({
        // some basic styles to make the items look a bit nicer
        ...itemsBaseStyles,

        // change background colour if dragging
        background: isDragging ? itemsBackgroundColors.isDragging : itemsBackgroundColors.default,

        // styles we need to apply on draggables
        ...draggableStyle,
    })
};

class DraggableItem extends React.Component {
    render() {
        return (
            <Draggable
                draggableId={this.props.draggableId}
                index={this.props.index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                            this.props.itemsBaseStyles,
                            this.props.itemsBackgroundColors
                        )}
                    >
                        <div>
                            {this.props.content}
                        </div>
                    </div>
                )}
            </Draggable>
        )
    }
}

export default DraggableItem
