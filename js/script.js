/* GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game */

var scores, roundScore, activePlayer, gamePlaying, winScore; 

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		
		var diceDom1 = document.querySelector('.dice1');
		var diceDom2 = document.querySelector('.dice2');

		var value = document.getElementById('setNewScoreInput').value;
		winScore = parseInt(value);
		
		document.getElementById('setNewScoreInput').style.borderColor = '';

		document.querySelector('.pig-display-0').textContent = '';
		document.querySelector('.pig-display-1').textContent = '';
			
		diceDom1.style.display = 'block';
		diceDom1.src = './images/dice-'+ dice1 +'.png';
		
		diceDom2.style.display = 'block';
		diceDom2.src = './images/dice-'+ dice2 +'.png';
		
		if (dice1 !==1 && dice2 !==1) {
			roundScore += dice1 + dice2;
			document.getElementById('current-'+ activePlayer).textContent = roundScore;
		} else {
			document.getElementById('pig-display-player-'+ activePlayer).textContent = 'PIG!';
		// Add   delay
		setTimeout(() => {
			nextPlayer ();	
		}, 800);
	
		}
	}	
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		scores[activePlayer] += roundScore;

		document.getElementById('score-'+ activePlayer).textContent = scores[activePlayer];

		if (scores[activePlayer] >= winScore) { 
			document.getElementById('name-'+activePlayer).textContent = 'WINNER!';
			document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
			document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
			hideDice();
			gamePlaying = false;
		} else {
			nextPlayer ();
		}
	}
});



document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer () {
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.getElementById('current-'+ activePlayer).textContent = 0;
	hideDice();
	
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
};

function hideDice() {
	document.querySelector('.dice1').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';
};

function init() { 
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true; 
	winScore = 100; 
	
	document.getElementById('setNewScoreInput').value=100;
	document.getElementById('setNewScoreInput').style.borderColor = '';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.add('active');
	
	document.querySelector('.pig-display-0').textContent = '';
	document.querySelector('.pig-display-1').textContent = '';

	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;

	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	
	hideDice();
};










































