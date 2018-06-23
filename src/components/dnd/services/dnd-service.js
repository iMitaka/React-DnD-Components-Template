export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    for (let i = 0; i < result.length; i++) {
        result[i].orderNumber = i + 1;
    }

    return result;
};

export const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    for (let i = 0; i < result[droppableSource.droppableId].length; i++) {
        result[droppableSource.droppableId][i].orderNumber = i + 1;
    }

    for (let i = 0; i < result[droppableDestination.droppableId].length; i++) {
        result[droppableDestination.droppableId][i].orderNumber = i + 1;
    }

    return result;
};

export const generateGuid = () => {
    let guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    return guid;
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
