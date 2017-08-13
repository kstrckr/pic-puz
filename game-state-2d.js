"use strict";

const initSqrArray = (width) => {
    return new Array(width);
}

function Tile(id, xPosition, yPosition) {
    this.id = id;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
}

const buildRow = (targetArr, width, y) => {
    let x = width;
    let xPosition = 100 - x*25;
    let yPosition = y*25;
    let newTile = new Tile(`x${4 - x}_y${y}`, xPosition, yPosition);
    if (targetArr[y] !== undefined) {
        targetArr[y].push(newTile);
    } else {
        targetArr[y] = [
            newTile
        ]
    }
    if (width === 1) return;
    buildRow(targetArr, x - 1, y);
}

const  fillTilesArray = (targetArr, y = 0) => {
    let width = targetArr.length;
    buildRow(targetArr, width, y);
    if (y === 3) return;
    fillTilesArray(targetArr, y + 1)
    
}

const tileArr = initSqrArray(4);
fillTilesArray(tileArr);
console.log(tileArr);
