/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousRoll, dice1, dice2, max, gamePlaying, winningScore;

init();


//Add event-listener to Roll-Dice button
document.querySelector('.btn-roll').addEventListener('click', rollDice);

document.querySelector('.btn-hold').addEventListener('click', hold);

document.querySelector('.btn-new').addEventListener('click', init);

function rollDice () {
    

    if(gamePlaying){
        // Random number generator
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;

        // Display result
        // var diceDOM = document.querySelector('.dice')
        document.getElementById('dice-1').style.display = "block";
        document.getElementById('dice-2').style.display = "block";

        document.getElementById('dice-1').src = 'images/dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'images/dice-' + dice2+ '.png';


        document.querySelector('#current-' + activePlayer).textContent = dice1 + dice2;

        if(dice1 !== 1 && dice2 !== 1){
            //Add Score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next Player
            nextPlayer()
            
        }
        
        //Update Scores
        // if(dice === 6 && previousRoll === 6) {
        //     scores[activePlayer] = 0;
        //     document.querySelector('#current-' + activePlayer).textContent = '0';
        //     document.querySelector('#score-' + activePlayer).textContent = '0';
        //     nextPlayer()
        // }else if(dice !== 1){
        //     //Add Score
        //     roundScore += dice;
        //     document.querySelector('#current-' + activePlayer).textContent = roundScore;
        // } else {
        //     //Next Player
        //     nextPlayer()
            
        // }

        // previousRoll = dice;
    }
    
    
}

function hold () {
    if(gamePlaying) {
        //Add Scores
        scores[activePlayer] +=  roundScore;


        //Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
        

        // Check if player won the game
        
        var input = document.querySelector('.final-score').value
        var winningScore = input;
        
        if(winningScore){
            winningScore = input; 
        } else {
            winningScore = 100;
        } 
        
        if(scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = "WINNER!!!";
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

            document.getElementById('dice-1').style.display = "none";
            document.getElementById('dice-2').style.display = "none";
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer()
        }

    }
    
}

function nextPlayer() {

    document.getElementById('current-' + activePlayer).textContent = '0';
    // document.getElementById('current-1').textContent = '0';

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = "none";
    document.getElementById('dice-2').style.display = "none";

}


function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    // document.querySelector('.dice').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player-1';
    document.getElementById('name-1').textContent = 'Player-2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');


}
