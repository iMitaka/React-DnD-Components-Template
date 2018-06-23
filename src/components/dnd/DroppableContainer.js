import React from 'react';
import DraggableItem from './DraggableItem'
import { Droppable } from 'react-beautiful-dnd';
import { generateGuid } from './services/dnd-service'

const getListStyle = (isDraggingOver, containerBaseStyles, containerBackgroundColors) => {
    containerBackgroundColors = containerBackgroundColors || { default: 'lightgrey', isDraggingOver: 'lightblue' }

    return ({
        background: isDraggingOver ? containerBackgroundColors.isDraggingOver : containerBackgroundColors.default,
        ...containerBaseStyles
    })
};

class DroppableContainer extends React.Component {
    render() {
        let itemsCollection = this.props.itemsCollection.map((item, index) => {
            return (
                <DraggableItem
                    key={index}
                    draggableId={generateGuid()}
                    index={index}
                    content={item.content}
                    itemsBaseStyles={this.props.itemsBaseStyles}
                    itemsBackgroundColors={this.props.itemsBackgroundColors} />
            )
        })

        return (
            <Droppable
                droppableId={this.props.droppableId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(
                            snapshot.isDraggingOver,
                            this.props.containerBaseStyles,
                            this.props.containerBackgroundColors)}
                    >
                        {itemsCollection}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }
}

export default DroppableContainer 