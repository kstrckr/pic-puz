"use strict";

const buildDivs = (outputTarget, edgeLength) => {

    let fragment = document.createDocumentFragment();
    for (let i = 0; i <= edgeLength; i++) {    
        let div = document.createElement('div');
        div.id = `tile_${i}`;
        div.className = "tile";
        fragment.appendChild(div);
    }
    outputTarget.appendChild(fragment);
}

const tiles = new Array(4);

//constructor of Tiles
function Tile(id, xPosition, yPosition) {
    this.id = id;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
}

const setLastElementEmpty = (targetArray) => {
    let lastElementIndex = targetArray.length - 1;
    targetArray[lastElementIndex].id = "EMPTY";
}

const createTilesinArray = (targetArray) => {
    for (let i = 0; i < tiles.length; i++) {
        tiles[i] = new Tile(`tile_${i}`, i * 25, 0);
    }
    setLastElementEmpty(targetArray);
}

const moveAtile = (targetTileId, targetArray) => {
    console.log(targetTileId, targetArray)
    let targetTileIndex =  targetArray.findIndex((val) => {
        return val.id === targetTileId
    })

    console.log(targetArray[targetTileIndex].xPosition, targetArray[targetArray.length - 1].xPosition)

    if (Math.abs(targetArray[targetTileIndex].xPosition - targetArray[targetArray.length - 1].xPosition) === 25) {
        let newPosition;
        if (targetArray[targetTileIndex].xPosition - targetArray[targetArray.length - 1].xPosition < 0) {
            newPosition = targetArray[targetTileIndex].xPosition + 25;
            targetArray[targetTileIndex].xPosition += 25;
            targetArray[targetArray.length - 1].xPosition -= 25;
        } else {
            newPosition = targetArray[targetTileIndex].xPosition - 25;
            targetArray[targetTileIndex].xPosition -= 25;
            targetArray[targetArray.length - 1].xPosition += 25;            
        }
        let newPositionString = newPosition.toString()
        document.getElementById(targetTileId).style.left = newPositionString + "%";
    }

}

createTilesinArray(tiles);
buildDivs(document.getElementById('game-container'), 8)

console.log(tiles);
