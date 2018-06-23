import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DroppableContainer from './components/dnd/DroppableContainer'
import { reorder, move } from './components/dnd/services/dnd-service'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      numberCollection: localStorage.getItem('numberCollection') ? JSON.parse(localStorage.getItem('numberCollection')) : [
        {
          id: 1, content: (
            <div className="row">
              <div className="col">
                <img src={'http://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg'} className="img-thumbnail" alt="cool-pic" />
              </div>
            </div>
          ), orderNumber: 1
        },
        { id: 2, content: 1, orderNumber: 1 },
        { id: 3, content: 2, orderNumber: 2 },
        { id: 4, content: 3, orderNumber: 3 }
      ],
      numberCollection2: localStorage.getItem('numberCollection2') ? JSON.parse(localStorage.getItem('numberCollection2')) : [
        { id: 1, content: 11, orderNumber: 1 },
        { id: 2, content: 22, orderNumber: 2 },
        { id: 3, content: 33, orderNumber: 3 }
      ],
      numberCollection3: localStorage.getItem('numberCollection3') ? JSON.parse(localStorage.getItem('numberCollection3')) : [
        { id: 1, content: 111, orderNumber: 1 },
        { id: 2, content: 222, orderNumber: 2 },
        { id: 3, content: 333, orderNumber: 3 }
      ]
    }
  }

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.state[source.droppableId],
        source.index,
        destination.index
      );

      this.setState({
        [source.droppableId]: items
      });

      // localStorage.setItem(source.droppableId, JSON.stringify(items));
    } else {
      const result = move(
        this.state[source.droppableId],
        this.state[destination.droppableId],
        source,
        destination
      );

      this.setState({
        [source.droppableId]: result[source.droppableId],
        [destination.droppableId]: result[destination.droppableId]
      });

      // localStorage.setItem(source.droppableId, JSON.stringify(result[source.droppableId]));
      // localStorage.setItem(destination.droppableId, JSON.stringify(result[destination.droppableId]));
    }
  };

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        <div className="row text-center">
          <div className="col-lg-4">
            <DroppableContainer
              droppableId="numberCollection"
              containerBaseStyles={{ padding: 8, width: 250, }}
              containerBackgroundColors={{ default: 'lightgrey', isDraggingOver: 'lightblue' }}
              itemsCollection={this.state.numberCollection}
              itemsBaseStyles={{ userSelect: 'none', padding: 8 * 2, margin: `0 0 8px 0`, }}
              itemsBackgroundColors={{ default: 'grey', isDragging: 'lightgreen' }}
            />
          </div>
          <div className="col-lg-4">
            <DroppableContainer
              droppableId="numberCollection2"
              containerBaseStyles={{ padding: 8, width: 250, }}
              containerBackgroundColors={{ default: 'lightgrey', isDraggingOver: 'lightblue' }}
              itemsCollection={this.state.numberCollection2}
              itemsBaseStyles={{ userSelect: 'none', padding: 8 * 2, margin: `0 0 8px 0`, }}
              itemsBackgroundColors={{ default: 'grey', isDragging: 'lightgreen' }}
            />
          </div>
          <div className="col-lg-4">
            <DroppableContainer
              droppableId="numberCollection3"
              containerBaseStyles={{ padding: 8, width: 250, }}
              containerBackgroundColors={{ default: 'lightgrey', isDraggingOver: 'lightblue' }}
              itemsCollection={this.state.numberCollection3}
              itemsBaseStyles={{ userSelect: 'none', padding: 8 * 2, margin: `0 0 8px 0`, }}
              itemsBackgroundColors={{ default: 'grey', isDragging: 'lightgreen' }}
            />
          </div>
        </div>
      </DragDropContext>
    );
  }
}

export default App;
