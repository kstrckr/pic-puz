"use strict";

const initSqrArray = (width) => {
    return new Array(width);
}

const randomBgOffsetArr = function(size) {
    let seedArrX = []
    for (let x = 0; x < size/4; x++) {
        for (let y = 0; y < size/4; y++) {
            seedArrX.push([x, y])
        }
    }
    
    //seedArrX = seedArrX.concat(seedArrX, seedArrX, seedArrX);
    seedArrX.sort(function(a, b) {return 0.5 - Math.random()})
    return seedArrX;
}

function Tile(id, xPosition, yPosition, bgOffset) {
    this.id = id;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.bgOffset = bgOffset;
}

const empty = {
    xPosition: 0,
    yPosition: 0,
}

const buildCol = (targetArr, height, x, bgOffsetArr) => {
    let offset = bgOffsetArr.pop()
    let y = height;
    let yPosition = 100 - y*25;
    let xPosition = x*25;
    let newTile = new Tile(`x${x}_y${4 - y}`, xPosition, yPosition, offset);
    if (targetArr[x] !== undefined) {
        targetArr[x].push(newTile);
    } else {
        targetArr[x] = [
            newTile
        ]
    }
    if (height === 1) return;
    buildCol(targetArr, y - 1, x, bgOffsetArr);
}

const fillTilesArray = (targetArr, offsetArr, x = 0) => {
    let width = targetArr.length;
    buildCol(targetArr, width, x, offsetArr);
    if (x === width - 1) return;
    fillTilesArray(targetArr, offsetArr, x + 1)
}

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
            div.style.backgroundPositionX = `${(100/3) * sourceArray[x][y].bgOffset[0]}%`;
            div.style.backgroundPositionY = `${(100/3) * sourceArray[x][y].bgOffset[1]}%`;
            fragment.appendChild(div);
        }
    }
    let deletedTile = fragment.children[0];
    fragment.removeChild(deletedTile);
    targetContainer.appendChild(fragment);

}

const moveATile = (x, y, gameStateArr) => {
    console.log(gameStateArr[x][y].id)
    let offsetX = x - empty.xPosition
    let offsetY = y - empty.yPosition
    if (Math.abs(offsetX) === 0 && Math.abs(offsetY) === 1) {
        console.log("this tile can move vertically!")
        if (offsetY > 0) {
            console.log("this tile can move up")
        } else {
            console.log("this tile can move down")
        }
    } else if (Math.abs(offsetX) === 1 && Math.abs(offsetY) === 0) {
        console.log('this tile can move horizontally!')
        if (offsetX > 0) {
            console.log('this tile can move left!')
        } else {
            console.log('this tile can move right')
        }
    }
}

const tileArr = initSqrArray(4);
const gameBoard = document.getElementById('game-container');
let offsetArr = randomBgOffsetArr(16)
fillTilesArray(tileArr, offsetArr);
console.log(tileArr);

buildDivs(gameBoard, tileArr);