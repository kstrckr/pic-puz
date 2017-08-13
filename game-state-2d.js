"use strict";

const initSqrArray = (width) => {
    return new Array(width);
}

function Tile(id, xPosition, yPosition) {
    this.id = id;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
}

const buildRow = (targetArr, height, x) => {
    let y = height;
    let yPosition = 100 - y*25;
    let xPosition = x*25;
    let newTile = new Tile(`x${x}_y${4 - y}`, xPosition, yPosition);
    if (targetArr[x] !== undefined) {
        targetArr[x].push(newTile);
    } else {
        targetArr[x] = [
            newTile
        ]
    }
    if (height === 1) return;
    buildRow(targetArr, y - 1, x);
}

const fillTilesArray = (targetArr, x = 0) => {
    let width = targetArr.length;
    buildRow(targetArr, width, x);
    if (x === width - 1) return;
    fillTilesArray(targetArr, x + 1)
}

const tileArr = initSqrArray(4);
fillTilesArray(tileArr);
console.log(tileArr);

const buildDivs = (targetContainer, sourceArray) => {
    let width = sourceArray.length;
    let fragment = document.createDocumentFragment();

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < width; y++) {
            let div = document.createElement('div');
            div.id = sourceArray[x][y].id;
            div.className = "tile";
            div.style.left = `${sourceArray[x][y].xPosition}%`
            div.style.top = `${sourceArray[x][y].yPosition}%`
        }
    }

}
