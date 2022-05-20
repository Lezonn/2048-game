const dimension = 4
let isStart = false

let gameGrid = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]

$(document).on('keydown', function(e) {
  console.log(gameGrid)
  if(e.key === ' ' && !isStart) {
    $('h1').addClass('visually-hidden');
    isStart = true
  }
  else if(!isStart) {
    return
  }
  else if (e.key == 'ArrowUp') {
    moveUp()
  }
  else if (e.key == 'ArrowDown') {
    moveDown()
  }
  else if (e.key == 'ArrowLeft') {
    moveLeft()
  }
  else if (e.key === 'ArrowRight') {
    moveRight()
  }
  else {
    return
  }
  spawnRandomNumber()
  renderGridAsHTML()
})

function spawnRandomNumber() {
  let emptySlot = getEmptySlot()
  if(emptySlot.length === 0) {
    console.log('lose')
    return 
  }
  let spawnPosition = getRandomPosition(emptySlot)
  gameGrid[spawnPosition[0]][spawnPosition[1]] = 1
}

function getRandomPosition(emptySlot) {
  
  let length = emptySlot.length
  let position = Math.floor(Math.random() * length)
  let x = emptySlot[position][0]
  let y = emptySlot[position][1]
  return [x, y]
}

function getEmptySlot() {
  let tempEmptySlot = []
  for(let i = 0; i < dimension; i++) {
    for(let j = 0; j < dimension; j++) {
      if(gameGrid[i][j] === 0) {
        tempEmptySlot.push([i, j])
      }
    }
  }
  return tempEmptySlot
}

function movementHandler(move) {
  if(move == 'Left') {
    moveLeft()
  }
}

function moveLeft() {
  for(let i = 0; i < dimension; i++) {
    for(let j = 0; j < dimension; j++) {
      if(gameGrid[i][j] == 0) {
        continue
      }

      let leftPos = j - 1
      let isMerge = false

      while(leftPos >= 0) {
        let curPos = leftPos + 1
        if(gameGrid[i][leftPos] === 0) {
          gameGrid[i][leftPos] = gameGrid[i][curPos]
          gameGrid[i][curPos] = 0
        }
        if(gameGrid[i][leftPos] === gameGrid[i][curPos] && !isMerge) {
          gameGrid[i][leftPos] += gameGrid[i][curPos]
          gameGrid[i][curPos] = 0
          isMerge = true
        }
        leftPos--
      }
    }
  }
}

function moveRight() {
  for(let i = 0; i < dimension; i++) {
    for(let j = dimension - 1; j >= 0; j--) {
      if(gameGrid[i][j] == 0) {
        continue
      }

      let rightPos = j + 1
      let isMerge = false

      while(rightPos < dimension) {
        let curPos = rightPos - 1
        if(gameGrid[i][rightPos] === 0) {
          gameGrid[i][rightPos] = gameGrid[i][curPos]
          gameGrid[i][curPos] = 0
        }
        if(gameGrid[i][rightPos] === gameGrid[i][curPos] && !isMerge) {
          gameGrid[i][rightPos] += gameGrid[i][curPos]
          gameGrid[i][curPos] = 0
          isMerge = true
        }
        rightPos++
      }
    }
  }
}

function moveUp() {
  for(let i = 0; i < dimension; i++) {
    for(let j = 0; j < dimension; j++) {
      if(gameGrid[j][i] == 0) {
        continue
      }

      let upPos = j - 1
      let isMerge = false

      while(upPos >= 0) {
        let curPos = upPos + 1
        if(gameGrid[upPos][i] === 0) {
          gameGrid[upPos][i] = gameGrid[curPos][i]
          gameGrid[curPos][i] = 0
        }
        if(gameGrid[upPos][i] === gameGrid[curPos][i] && !isMerge) {
          gameGrid[upPos][i] += gameGrid[curPos][i]
          gameGrid[curPos][i] = 0
          isMerge = true
        }
        upPos--
      }
    }
  }
}

function moveDown() {
  for(let i = 0; i < dimension; i++) {
    for(let j = dimension - 1; j >= 0; j--) {
      if(gameGrid[j][i] == 0) {
        continue
      }

      let downPos = j + 1
      let isMerge = false

      while(downPos < dimension) {
        let curPos = downPos - 1
        if(gameGrid[downPos][i] === 0) {
          gameGrid[downPos][i] = gameGrid[curPos][i]
          gameGrid[curPos][i] = 0
        }
        if(gameGrid[downPos][i] === gameGrid[curPos][i] && !isMerge) {
          gameGrid[downPos][i] += gameGrid[curPos][i]
          gameGrid[curPos][i] = 0
          isMerge = true
        }
        downPos++
      }
    }
  }
}

function renderGridAsHTML() {
  for(let i = 0; i < dimension; i++) {
    for(let j = 0; j < dimension; j++) {
      let selector = '.row-' + (i+1) + ' .box-' + (j+1)
      if(gameGrid[i][j] != 0) {
        $(selector).text(gameGrid[i][j]);
      }
      else {
        $(selector).text('');
      }
    }
  }
}

