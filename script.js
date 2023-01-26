const speedLevel = 200
let snakeCoordinates = [
  { x: 11, y: 11 }
]
const gameDisplay = document.getElementById('game-display')
let userInput = { x: 0, y: 0 }
let previousInput = { x: 0, y: 0 }
let upgrade = { x: 12, y: 12 }
let newUpgrades = 5
let gameState = true
let score = 0
const resetBtn = document.getElementById('reset')
const gameOver = document.getElementById('game-over')
const userScore = document.getElementById('score')




//runs through each step in the game and is called by the interval function to repeat
const playGame = () => {
  if (gameState === true) {
    renderSnake()
    renderUpgrade()
    updateSnake()
    updateUpgrade()
    checkPosition(snakeCoordinates[0])
  } else if (gameState === false) {
    gameOver.innerHTML = 'LOSS! reset to play again'
  }
}

const renderSnake = () => {

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
  checkSelfHit(snakeCoordinates[0])

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
    score += 1
    userScore.innerHTML = `Score: ${score}`
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
//it will then plug in the coordinates to the verifyUpgradeLocation function if it is valid it will set the new coordinates for the food
//if it is false then recursivley call randomizeUpgrade again until true condition is met
const randomizeUpgrade = () => {
  const xCoord = Math.floor((Math.random() * 21) + 1)
  const yCoord = Math.floor((Math.random() * 21) + 1)
  if (verifyUpgradeLocation(xCoord, yCoord) === true) {
    upgrade.x = xCoord
    upgrade.y = yCoord
  } else if (verifyUpgradeLocation(xCoord, yCoord) === false) {
    randomizeUpgrade()
  }


}
//verifies if the coordinates randomly produced fall somewhere on the snake, if it does return false, otherwise return true
const verifyUpgradeLocation = (x, y) => {
  let validLocation = true
  for (let i = 0; i < snakeCoordinates.length; i++) {
    if (snakeCoordinates[i].x === x && snakeCoordinates[i].y === y) {
      validLocation = false
    } else {
      validLocation = true
    }
  }
  return validLocation
}
//Currently checks if the snakeHead is within the area of the actual gameboard, if not displays an alert
const checkPosition = (headCoord) => {
  if (headCoord.x >= 22 || headCoord.x < 0 || headCoord.y >= 22 || headCoord.y < 0) {
    gameState = false

  }

}
//takes in the coordinates of the head and checks 1: if it has more than one body segment and 2: if the head coords are equal to any of the body segment coords the player loses
const checkSelfHit = (headCoord) => {
  if (snakeCoordinates.length > 1) {
    for (let i = 1; i < snakeCoordinates.length; i++) {
      if (headCoord.x === snakeCoordinates[i].x && headCoord.y === snakeCoordinates[i].y) {

        gameState = false



      }
    }
  }
}
//called by button press, resets the snake back to one coordinates changes user input to nothing set gamestate back to true and clear the gameOver inner html
const resetGame = () => {
  snakeCoordinates = [
    { x: 11, y: 11 }
  ]
  userInput = { x: 0, y: 0 }
  previousInput = { x: 0, y: 0 }
  score = 0
  userScore.innerHTML = 'Score: 0'
  gameOver.innerHTML = ''
  gameState = true


}

//adds an event listener to the keys used to control the snake, used stackoverflow as reference on how to complete
//When a key is pressed set userInput equal to the corresponding direction, direction is then added to the actual x and y coordinates constantly updating its position
document.addEventListener('keypress', function (e) {
  //the nested if statements make sure that if you are moving in a direction you cannot reverse, as the snakes body would be in the way
  //EX. if we were moving up and pressed d to go down the previous y input would equal -1 and not allow the user to make the move
  if (e.key === 'w') {
    if (previousInput.y === 0) {
      userInput = { x: 0, y: -1 }

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

resetBtn.addEventListener('click', () => {
  resetGame()
})
//Loops through the playGame function every second when speedLevel is 1000
setInterval(playGame, speedLevel)

