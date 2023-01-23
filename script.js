const speedLevel = 20000
const snakeCoordinates = [
  { x: 11, y: 11 }
]
const gameDisplay = document.getElementById('game-display')
let userInput = { x: 0, y: 0 }
let previousInput = { x: 0, y: 0 }
let upgrade = { x: 5, y: 5 }
let newUpgrades = 1
let gameState = true




//runs through each step in the game and is called by the interval function to repeat
const playGame = () => {

  renderSnake()
  renderUpgrade()
  updateSnake()
  updateUpgrade()
  console.log(snakeCoordinates[0])
}

const renderSnake = () => {
  console.log('render')
  //for each coordinate in the list create a new div and set its position to where its object dictates
  //applies snakeBody class to each new div which makes it appear
  //appends that div into the main game-display div
  gameDisplay.innerHTML = ''

  snakeCoordinates.forEach((coordinate, index) => {
    const segment = document.createElement('div')
    segment.style.gridRowStart = coordinate.y
    segment.style.gridColumnStart = coordinate.x
    segment.classList.add('snakeBody')
    gameDisplay.appendChild(segment)
  })
  previousInput = userInput
  snakeCoordinates[0].x += userInput.x
  snakeCoordinates[0].y += userInput.y
}
const updateSnake = () => {
  //for each of the elements within the snake set the following segments equal to the segment in front of it
  for (let i = snakeCoordinates.length - 2; i >= 0; i--) {
    //sets the snakeCoordinate 1 ahead of the current element equal to a copy of to the current coordinates object
    snakeCoordinates[i + 1] = { ...snakeCoordinates[i] }
  }

}
//creates a new div element and populates it with where it appears and toggles its class applying css
//appends the food to somewhere in the game display
const renderUpgrade = () => {
  const upgradeDiv = document.createElement('div')
  upgradeDiv.style.gridRowStart = upgrade.y
  upgradeDiv.style.gridColumnStart = upgrade.x
  upgradeDiv.classList.add('upgrade')
  gameDisplay.appendChild(upgradeDiv)
}
//if validateUpgrade returns true call the add upgrade function
const updateUpgrade = () => {
  if (validateUpgrade(upgrade, snakeCoordinates[0])) {
    addUpgrade()
  }
}
// if the coordinates of the upgrade and the coordinates of the head of the snake are the same return true, otherwise return false
const validateUpgrade = (upgradeCoordinates, snakeHeadCoordinates) => {
  if (upgradeCoordinates.x === snakeHeadCoordinates.x && upgradeCoordinates.y === snakeHeadCoordinates.y) {

    return true

  } else {
    return false
  }
}
//for each of the amount of uprades push a new coordinate object to the end of the snake coordinates array with the values of the last segment
//Had issue rendering first new segment, if statement handles if there is only one item in the coordinates array
const addUpgrade = () => {
  if (snakeCoordinates.length === 1) {
    snakeCoordinates.push({ ...snakeCoordinates[snakeCoordinates.length - 1] })
  }
  for (let i = 0; i < newUpgrades; i++) {
    snakeCoordinates.push({ ...snakeCoordinates[snakeCoordinates.length - 1] })
  }
  randomizeUpgrade()
}
//When called this function will set the new coordinates of the upgrade to a random number between 1 and 21
const randomizeUpgrade = () => {
  const xCoord = Math.floor((Math.random() * 21) + 1)
  const yCoord = Math.floor((Math.random() * 21) + 1)
  upgrade.x = xCoord
  upgrade.y = yCoord

}

const checkPosition = (headCoord) => {

}
//adds an event listener to the keys used to control the snake, used stackoverflow as reference on how to complete
//When a key is pressed set userInput equal to the corresponding direction, direction is then added to the actual x and y coordinates constantly updating its position
document.addEventListener('keypress', function (e) {
  //the nested if statements make sure that if you are moving in a direction you cannot reverse, as the snakes body would be in the way
  //EX. if we were moving up and pressed d to go down the previous y input would equal -1 and not allow the user to make the move
  if (e.key === 'w') {
    if (previousInput.y === 0) {
      userInput = { x: 0, y: -1 }
      console.log('up')
    }

  } else if (e.key === 's') {
    if (previousInput.y === 0) {
      userInput = { x: 0, y: 1 }
    }
  } else if (e.key === 'd') {
    if (previousInput.x === 0) {
      userInput = { x: 1, y: 0 }
    }
  } else if (e.key === 'a') {
    if (previousInput.x === 0) {
      userInput = { x: -1, y: 0 }
    }
  }
})
//Loops through the playGame function every second when speedLevel is 1000
setInterval(playGame, speedLevel)
