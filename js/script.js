/* GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game */

const DOM = {}
let scores, roundScore, activePlayer, gamePlaying, winScore

fetchDom()
init()

document.querySelector('.btn-new').addEventListener('click', init)

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    const dice1 = Math.floor(Math.random() * 6) + 1
    const dice2 = Math.floor(Math.random() * 6) + 1

    winScore = parseInt(DOM.maxScore.value)
    DOM.maxScore.style.borderColor = ''

    DOM.pig0.textContent = ''
    DOM.pig1.textContent = ''

    DOM.dice1.style.display = 'block'
    DOM.dice1.src = './images/dice-' + dice1 + '.png'

    DOM.dice2.style.display = 'block'
    DOM.dice2.src = './images/dice-' + dice2 + '.png'

    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2
      DOM[`current${activePlayer}`].textContent = roundScore
    } else {
      // Add delay
      gamePlaying = false
      setTimeout(() => {
        gamePlaying = true
        nextPlayer()
      }, 800)
      DOM[`pig${activePlayer}`].textContent = 'PIG!'
    }
  }
})

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying && roundScore) {
    scores[activePlayer] += roundScore
    DOM[`score${activePlayer}`].textContent = scores[activePlayer]

    if (scores[activePlayer] >= winScore) {
      gamePlaying = false
      DOM[`current${activePlayer}`].textContent = 0
      DOM[`name${activePlayer}`].textContent = 'WINNER!'
      DOM[`panel${activePlayer}`].classList.remove('active')
      DOM[`panel${activePlayer}`].classList.add('winner')
      hideDice()
    } else {
      nextPlayer()
    }
  }
})

function nextPlayer() {
  DOM.panel0.classList.toggle('active')
  DOM.panel1.classList.toggle('active')
  DOM[`current${activePlayer}`].textContent = 0
  hideDice()

  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0)
  roundScore = 0
}

function fetchDom() {
  DOM.maxScore = document.getElementById('setNewScoreInput')
  DOM.name0 = document.getElementById('name-0')
  DOM.name1 = document.getElementById('name-1')
  DOM.panel0 = document.querySelector('.player-0-panel')
  DOM.panel1 = document.querySelector('.player-1-panel')
  DOM.pig0 = document.querySelector('.pig-display-0')
  DOM.pig1 = document.querySelector('.pig-display-1')
  DOM.score0 = document.getElementById('score-0')
  DOM.score1 = document.getElementById('score-1')
  DOM.current0 = document.getElementById('current-0')
  DOM.current1 = document.getElementById('current-1')
  DOM.dice1 = document.querySelector('.dice1')
  DOM.dice2 = document.querySelector('.dice2')
}

function init() {
  scores = [0, 0]
  roundScore = 0
  activePlayer = 0
  gamePlaying = true
  winScore = 100

  DOM.maxScore.value = 100
  DOM.maxScore.style.borderColor = ''
  DOM.name0.textContent = 'Player 1'
  DOM.name1.textContent = 'Player 2'
  DOM.panel0.classList.remove('winner')
  DOM.panel1.classList.remove('winner')
  DOM.panel1.classList.remove('active')
  DOM.panel0.classList.add('active')
  DOM.pig0.textContent = ''
  DOM.pig1.textContent = ''
  DOM.score0.textContent = 0
  DOM.score1.textContent = 0
  DOM.current0.textContent = 0
  DOM.current1.textContent = 0
  hideDice()
}

function hideDice() {
  DOM.dice1.style.display = 'none'
  DOM.dice2.style.display = 'none'
}
