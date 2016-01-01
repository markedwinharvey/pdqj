var cards="AAAABBBBCCCDDDDEEEEFFFGGGGHHHIIIIJKLLLLMMMMNNNNOOOOPPPPQRRRRSSSSTTTTUUUUVWXXYZ";
		var cardcheck = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		var random1 = 0., cardcount = 0, gameover = false, firstgame = true, numberOfPlayers = "number";
		var numberOfPlayerstries = 0, players = ["","","",""], playerscores = [0,0,0,0];
		var showingInstructions = false, card1placeholder = 0, card2placeholder = 0, card3placeholder = 0;
		var isPractice = true, gameInProgress = false, totalscore = 0, totalscorelastplay = 0;
		var justIncreasedTotalScore = false, cardsOut = false, lastToScore = "nobody";
		var gamechange = "";					//gamechange options are PtoKS and KStoP
		var playerNamesReceived = false, wantinggamechange = "", timerUp = false;
		var countDown = true, countingdown1 = false;
		
		window.onload=function(){				//auto-check "practice" on page load
			startGame();
		}
		
		function startGame(){
			document.getElementById("gameplay1").checked = true;
  			document.getElementById("gameplay2").checked = false;
  			document.getElementById("countdown1").checked = true;
  			document.getElementById("countdown2").checked = false;
			document.getElementById("numberplayerstext").value = "";
			document.getElementById("player1name").value = "";
			document.getElementById("player2name").value = "";
			document.getElementById("player3name").value = "";
			document.getElementById("player4name").value = "";
  			var browser = detectBrowser();
  			fireFoxCards(browser);
		}
		
		function detectBrowser(){
			var browser = navigator.userAgent;
			browser = browser.toLowerCase();
			for (i = 0; i < browser.length; i++){
				if (browser[i] === 'f'){
					if (browser[i+1] === 'i' && browser[i+2] === 'r' && browser[i+3] === 'e'){
						return 'firefox';
					}
				}
			}
			return 'not firefox';
		}
		
		function fireFoxCards(browser){
			if (browser === 'firefox'){
				document.getElementById('card1').style.marginTop = "30px";
				document.getElementById('card2').style.marginTop = "30px";
				document.getElementById('card3').style.marginTop = "30px";
				document.getElementById('newE1').style.marginTop = "50px";
				document.getElementById('newE2').style.marginTop = "50px";
				document.getElementById('newE3').style.marginTop = "50px";
				//document.getElementsByClassName('newE').style.marginTop = "50px";	
			}	
		}	
	
		function getPlayerNames(name1,name2,name3,name4){		//get player names and create scoreboard
			document.getElementById("card1").innerHTML = "";
			document.getElementById("card2").innerHTML = "";
			document.getElementById("card3").innerHTML = "";
			hideReloadMessage();
			players[0] = name1;
			players[1] = name2;
			players[2] = name3;
			players[3] = name4;
			playerNamesReceived = true;
			for (i = 1; i < 5; i++){
				var tempplayerbox = "playerbox" + i;
				document.getElementById(tempplayerbox).style.display = 'none';
			}
			for (i=0; i < numberOfPlayers; i++){			//sequentially input names into corresponding html elements and display them 
				var n = i + 1;
				var tempname = "name" + n;												//log name
				document.getElementById(tempname).innerHTML = players[i];
				var tempscore = "score" + n;											//log scores
				document.getElementById(tempscore).innerHTML = playerscores[i];
				var tempplayerbox = "playerbox" + n;									//display playerbox
				document.getElementById(tempplayerbox).style.display = 'block';
			}			
			document.getElementById("playersboard").style.display = 'block';			//display scoreboard
			document.getElementById("enternamesbox").style.display = 'none';
			document.getElementById("button").style.display = 'inline-block';
			document.getElementById("buttontext").innerHTML = "Deal";		
		}	
				
		function getNewCard(){	//random letter selection from string *cards* based on cardcheck availability
			var stoploop = false;
			while(stoploop === false){					//loop until finding an unused letter
				random1 = Math.round(Math.random()*77); //random number 0-77
				if(cardcheck[random1] === 0){			//if letter at that position has not been used
					cardcheck[random1] = 1;				//make a letter placeholder
					stoploop = true;	
				}
			}
			cardcount++;
			return random1;								//return new random number
		}
		
		function getAllCards(){							//deal set of cards or show game over message
			if (cardcount < 78){						//if cards remain in deck				
					document.getElementById("card2").innerHTML = "";
					card1placeholder = getNewCard();
					document.getElementById("card1").innerHTML = cards[card1placeholder];
					if (cards[card1placeholder] === 'X'){
						document.getElementById("newE1").style.display = 'inline-block';
						document.getElementById("card1").style.marginLeft = "-20px";
					}													
					card2placeholder = getNewCard();
					document.getElementById("card2").innerHTML = cards[card2placeholder];
					if (cards[card2placeholder] === 'X'){
						document.getElementById("newE2").style.display = 'inline-block';
						document.getElementById("card2").style.marginLeft = "-20px";
					}	
					card3placeholder = getNewCard();
					document.getElementById("card3").innerHTML = cards[card3placeholder];
					if (cards[card3placeholder] === 'X'){
						document.getElementById("newE3").style.display = 'inline-block';
						document.getElementById("card3").style.marginLeft = "-20px";
					}
					cardsOut = true;
					justIncreasedTotalScore = false;
					document.getElementById("restart1").style.display = 'inline-block';
			}
			else{
				gameover = true;
				showGameOver();
			}
			/*
			else{
				document.getElementById("button").style.display = 'inline-block';
				document.getElementById("buttontext").innerHTML = "Game Over! Click to play again.";	
				document.getElementById("restart1").style.display = 'none';
				gameover = true;
				gameInProgress = false;
				cardsOut = false;
				document.getElementById("noanswer").style.display = 'none';
			}
			*/
		}
		
		function hideEcards(){
			document.getElementById("newE1").style.display = 'none';
			document.getElementById("newE2").style.display = 'none';
			document.getElementById("newE3").style.display = 'none';
			document.getElementById("card1").style.marginLeft = "0px";
			document.getElementById("card2").style.marginLeft = "0px";
			document.getElementById("card3").style.marginLeft = "0px";
		}
			
		function resetBoard(){									//reset board but do not delete player identities
			cardcheck = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
			document.getElementById("buttontext").innerHTML = "Deal";
			document.getElementById("card1").innerHTML = "";
			document.getElementById("card2").innerHTML = "";
			document.getElementById("card3").innerHTML = "";
			cardcount = 0;
			cardsOut = false;
			gameover = false;
			totalscore = 0;
			document.getElementById("winnermessageouterbox").style.display = 'none';
			for (i = 1; i < 5; i++){						//reset scores to zero and display them
				n = i - 1;
				playerscores[n] = 0;
				var tempscore = "score" + i;
				document.getElementById(tempscore).innerHTML = 0;
			}
		}
		
		function getNumberOfPlayers(numplayers){				//get number of players and call get player names function
			hideReloadMessage();
			if (numplayers.length === 1 && 0 < numplayers && numplayers < 5){
				numberOfPlayers = numplayers;
				document.getElementById("numberOfPlayersBox").style.display = 'none';
				document.getElementById("enternamesbox").style.display = 'inline-block';				//show enter names box
				document.getElementById("player1name").focus();
				for (i = 1; i < 5; i++){																//hide all name boxes
					var tempname = "playernamebox" + i;
					document.getElementById(tempname).style.display = 'none';
				}
				for (i = 1; i <= numberOfPlayers; i++){													//show the correct number of entry fields for names
					var tempname = "playernamebox" + i;
					document.getElementById(tempname).style.display = 'block';
				}
			}
			else{
				document.getElementById("enterplayernumber").innerHTML = "Please enter a valid number of players (1-4)";
				document.getElementById("numberplayerstext").value = "";
				document.getElementById("numberplayerstext").focus();
			}
			selectAll('player1name');
		}

		function deal(){	//get number of players (and player names) or deal or reset the board
			document.getElementById("noanswertext").style.display = 'none';		//hide the disclaimer if present from previous "No Answer" click
			//document.getElementById("pointsawarded").style.display = 'none';
			document.getElementById("pointsawarded").style.color = 'white';
			hideEcards();
			//document.getElementById("restart1").style.display = 'inline-block';
			
			hideReloadMessage();
			for (i = 1; i < 5; i++){								//hide all down arrows
				var temparrowdownnumber = "arrow-down" + i;
				document.getElementById(temparrowdownnumber).style.display = 'none';
			}
			gameInProgress = true;
			cardsOut = false;
			lastToScore = "nobody";
			if (isPractice === false){					//not practice round, keeping score
				if (firstgame === true){				//if this is the first game since page load
					//getNumberOfPlayers();				//get the number of players -getPlayerNames function is inside getNumberOfPlayers function
					document.getElementById("numberOfPlayersBox").style.display = 'inline-block';		//display box to allow user input of number of players
					document.getElementById("numberplayerstext").focus();
					document.getElementById("button").style.display = 'none';							//onclick calls get number of players
					firstgame = false;					//the first game criterion has been satisfied; this is no longer the first game
					totalscore = 0;
					for (i = 1; i < 5; i++){			//set default player names (input values)
						var tempid = 'player' + i + 'name';
						var tempname = 'Player' + i;
						document.getElementById(tempid).value = tempname;
					}
				}
				else{									//if this is not the first game (set up to deal on the second click)
					if (gameover === false){			//gameover === false; this is an active game
						if (totalscore < 26){
							if(cardcount < 78){
								timer();
								//getAllCards();					//get new cards
							}
							else{
								showGameOver();
							}
							document.getElementById("button").style.display = 'none';
							if (countDown === false){																	
								document.getElementById("noanswer").style.display = 'inline-block';					//no answer text here	
								document.getElementById("allocatediv").style.display = 'block';
							}
							for (i = 1; i < 5; i++){
								var temparrowupnumber = "arrow-up" + i;
								document.getElementById(temparrowupnumber).style.display = 'inline-block';
							}
						}
						else{
							endgame();
						}	
					}
					else{								//the game is over
						resetBoard();					//reset the board
					}
				}
			}
			else{										//this is a practice game! no score keeping!
				document.getElementById("playersboard").style.display = 'none';
				if (gameover === false){				//game is in progress
					document.getElementById("buttontext").innerHTML = "Deal";
					if(cardcount < 78){
						timer();						//start timer; getAllCards() when timer is up
						//getAllCards();
					}
					else{
						showGameOver();
					}
				}
				else{									//game is over
					//showGameOver();
					resetBoard();						//reset the board
				}
			}
		}
		
		function showGameOver(){
			document.getElementById("button").style.display = 'inline-block';
			document.getElementById("buttontext").innerHTML = "Game Over! Click to play again.";	
			document.getElementById("restart1").style.display = 'none';
			gameover = true;
			gameInProgress = false;
			cardsOut = false;
			document.getElementById("noanswer").style.display = 'none';
			document.getElementById("allocatediv").style.display = 'none';
		}
		
		function timer(){
			//document.getElementById("button").style.display = 'none';
			if (countDown === true){
				hideThingsForCountdown(true);
				countingdown1 = true;
				document.getElementById("card1").style.color = "white";
				document.getElementById("card2").style.color = "#FF7A7A";
				document.getElementById("card3").style.color = "white";
				document.getElementById("card1").innerHTML = 3;
				document.getElementById("card2").innerHTML = 3;
				document.getElementById("card3").innerHTML = 3;
				setTimeout(function(){
					document.getElementById("card1").innerHTML = 2;
					document.getElementById("card2").innerHTML = 2;
					document.getElementById("card3").innerHTML = 2;
					setTimeout(function(){
						document.getElementById("card1").innerHTML = 1;
						document.getElementById("card2").innerHTML = 1;
						document.getElementById("card3").innerHTML = 1;
						setTimeout(function(){
							document.getElementById("card1").style.color = "black";
							document.getElementById("card2").style.color = "black";
							document.getElementById("card3").style.color = "black";
							getAllCards();
							//document.getElementById("button").style.display = 'inline-block';
							hideThingsForCountdown(false);
							countingdown1 = false;
						},750);
					},750);
			
				},750);	
			}
			else{
				getAllCards();
			}
		}
		
		function hideThingsForCountdown(hide){
			if (hide === true){
				var show = 'none';
				var isDisabled = true;
			}
			else{
				var show = 'inline-block';
				var isDisabled = false;
			}
			document.getElementById("button").style.display = show;
			document.getElementById("restart1").disabled = isDisabled;
			document.getElementById("gameplay1").disabled = isDisabled;
			document.getElementById("gameplay2").disabled = isDisabled;
			document.getElementById("countdown1").disabled = isDisabled;
			document.getElementById("countdown2").disabled = isDisabled;
			document.getElementById("gameplay1").disabled = isDisabled;
			if (isPractice === false){
				document.getElementById("button").style.display = 'none';
				document.getElementById("noanswer").style.display = show;
				if (hide === true){
					document.getElementById("allocatediv").style.display = 'none';
				}
				else{
					document.getElementById("allocatediv").style.display = 'block';
				}
			}
			//document.getElementById("instructionsbuttoninner").disabled = isDisabled;
			//document.getElementById("countdowndivouter").style.display = show;
			//document.getElementById("gameplay1").style.display = show;
			//document.getElementById("gameplay2").style.display = show;
		}
			
		function endgame(){
			gameover = true;
			gameInProgress = false;
			document.getElementById("button").style.display = 'inline-block';
			document.getElementById("buttontext").innerHTML = "Click to play again!";
			document.getElementById("noanswer").style.display = 'none';
			document.getElementById("allocatediv").style.display = 'none';
			document.getElementById("pointsawarded").innerHTML = "Points awarded. Game over.";	
			var winner = players[0];
			var winnerscore = playerscores[0];
			var tiedscore = false;
			for (i = 1; i < numberOfPlayers; i++){
				if (playerscores[i] > winnerscore){
					winner = players[i];
					winnerscore = playerscores[i];
				}
			}
			
			for (i = 0; i < numberOfPlayers; i++){
				if (winnerscore === playerscores[i] && winner !== players[i]){
					tiedscore = true;
				}
			}
			
			document.getElementById("winnermessageouterbox").style.display = 'inline-block';
			if (tiedscore === true){
				document.getElementById("winnermessage").innerHTML = "It's a tie!";
			}
			else{
				tempwinner = winner + " won the game!";
				document.getElementById("winnermessage").innerHTML = tempwinner;	
			}
		}	
			
		function noanswer(){	//reshuffle cards into deck from which were derived no answer
				hideReloadMessage();
				hideEcards();
				document.getElementById("noanswertext").style.display = 'inline-block';			//show no answer disclaimer
				document.getElementById("noanswer").style.display = 'none';						//hide no answer button
				document.getElementById("allocatediv").style.display = 'none';
				document.getElementById("card1").innerHTML = "";								//hide cards (as they are reshuffled into the deck)
				document.getElementById("card2").innerHTML = "";
				document.getElementById("card3").innerHTML = "";
				//document.getElementById("pointsawarded").style.display = 'none';
				document.getElementById("pointsawarded").style.color = 'white';
				document.getElementById("button").style.display = 'inline-block';				//show deal button
				document.getElementById("buttontext").innerHTML = "Deal";
				cardcount = cardcount - 3;														//reset card count to previous hand
				cardcheck[card1placeholder] = 0;												//make the current cards available for subsequent deals
				cardcheck[card2placeholder] = 0;
				cardcheck[card3placeholder] = 0;
				cardsOut = false;
		}
		
		function scorechange(player,direction){						//player 1 through 4
			hideReloadMessage();
			arrayPlayer = player - 1;								//temporary variable to translate player numbers (e.g. player1 stats are found at array slot 0)
			document.getElementById("winnermessageouterbox").style.display = 'none';
			if (cardsOut === true){
				if (justIncreasedTotalScore === false){
					if (direction === "up"){
					
						var tempdownarrownumber = "arrow-down" + player;
						document.getElementById(tempdownarrownumber).style.display = 'inline-block';
						
						playerscores[arrayPlayer] += 1;
						lastToScore = players[arrayPlayer];
						totalscore +=1;
						justIncreasedTotalScore = true;
						document.getElementById("pointsawarded").style.color = 'black';
						if (totalscore >= 26){
							document.getElementById("pointsawarded").innerHTML = "Points awarded. Game over.";
							//endgame();	
						}
						else{
							document.getElementById("pointsawarded").innerHTML = "Points awarded. Click Deal when ready!";
						}
						document.getElementById("button").style.display = 'inline-block';			//if score changes, show Deal button and hide No Answer button 
						document.getElementById("noanswer").style.display = 'none';
						document.getElementById("allocatediv").style.display = 'none';
					}
				}
				else{
					if (direction === "down" && lastToScore === players[arrayPlayer]){
						playerscores[arrayPlayer] -= 1;
						var tempdownarrownumber = "arrow-down" + player;
						document.getElementById(tempdownarrownumber).style.display = 'none';
						totalscore -= 1;
						justIncreasedTotalScore = false;
						document.getElementById("pointsawarded").innerHTML = "Allocate points to continue!";
						document.getElementById("button").style.display = 'none';
						document.getElementById("noanswer").style.display = 'inline-block';
						document.getElementById("allocatediv").style.display = 'block';
						gameover = false;
						gameInProgress = true;
					}
				}
			}		
			var tempscore = "score" + player;
			document.getElementById(tempscore).innerHTML = playerscores[arrayPlayer];
			if (totalscore >= 26){
				endgame();
			}
		}
		
		function toggleInstructions(){					//show or hide instructions when "Instructions" button is clicked
			if (countingdown1 === false){
				if (showingInstructions === false){
					document.getElementById("instructions").style.display = 'block';
					showingInstructions = true;
				}
				else{
					document.getElementById("instructions").style.display = 'none';
					showingInstructions = false;
				}
			}
		}
		
		function gameselect(gameplayselect){				//select style of gameplay, whether practice or keeping score; isPractice = true or isPractice = false
			if (gameInProgress === false){				//if game is NOT in progress, allow radio button toggle
				if (gameplayselect === 'practice'){
					isPractice = true;
				}
				else{
					isPractice = false;
				}
			}
			else{										//if game IS in progress, forbid toggle and show disclaimer (ask if user would like to reload)
				document.getElementById("restart1").style.display = 'none';
				if (isPractice === true && gameplayselect === 'score'){		//gameplayselect is equivalent to isPractice in terms of boolean truths
					document.getElementById("gameplay1").checked = true;
					document.getElementById("gameplay2").checked = false;
					document.getElementById("reloadmessage").style.display = 'inline-block';					//message is only presented if user tries to change the gameplay
					document.getElementById("reloadmessage").innerHTML = "Practice in progress. Would you like to start a game?";	
					document.getElementById("progressbutton1").style.display = 'inline-block';			//i.e. hitting "practice" while in practice mode shows no change
					document.getElementById("progressbutton2").style.display = 'inline-block';				
					gamechange = "PtoKS";
				}
				else if (isPractice === false && gameplayselect === 'practice'){								//same as above; message only displayed when user tries to change gameplay in the middle of a game
					document.getElementById("gameplay1").checked = false;
					document.getElementById("gameplay2").checked = true;
					document.getElementById("reloadmessage").style.display = 'inline-block';
					document.getElementById("reloadmessage").innerHTML = "Game in progress. Would you like to switch to Practice?";
					document.getElementById("progressbutton1").style.display = 'inline-block';
					document.getElementById("progressbutton2").style.display = 'inline-block';
					gamechange = "KStoP";
				}
			}
		}
		
		function hideReloadMessage(){
			document.getElementById("reloadmessage").style.display = 'none';
			document.getElementById("progressbutton1").style.display = 'none';
			document.getElementById("progressbutton2").style.display = 'none';
		}
		
		function reloadProgram(reload){
			hideReloadMessage();
			
			if (reload === true){
				if (countDown === true){
					document.getElementById("countdown1").checked = true;
					document.getElementById("countdown2").checked = false;
				}
				else{
					document.getElementById("countdown1").checked = false;
					document.getElementById("countdown2").checked = true;
				}
				
				hideEcards();
				
				if (gamechange === "PtoKS"){							// || isPractice === false		
					document.getElementById("gameplay1").checked = false;
					document.getElementById("gameplay2").checked = true;
					isPractice = false;
				}
				else if (gamechange ==="KStoP"){						//gamechange === "KStoP"   (changed else to else if) 
					document.getElementById("gameplay1").checked = true;
					document.getElementById("gameplay2").checked = false;
					document.getElementById("playersboard").style.display = 'none';
					isPractice = true;
					players = ["","","",""];
					playerscores = [0,0,0,0];
					
				}
				document.getElementById("noanswertext").style.display = 'none';

				for (i = 1; i < 5; i++){							//hide up arrows in player score board	
					var temparrowupnumber = "arrow-up" + i;
					document.getElementById(temparrowupnumber).style.display = 'none';
					var temparrowdownnumber = "arrow-down" + i;
					document.getElementById(temparrowdownnumber).style.display = 'none';
				}
				
				document.getElementById("numberplayerstext").value = "";
				document.getElementById("enternamesbox").style.display = 'none';
				document.getElementById("numberOfPlayersBox").style.display = 'none';
				document.getElementById("winnermessageouterbox").style.display = 'none';
				//document.getElementById("pointsawarded").style.display = 'none';
				document.getElementById("pointsawarded").style.color = 'white';
				document.getElementById("button").style.display = 'inline-block';	
				
				document.getElementById("playersboard").style.display = 'none';
				
				document.getElementById("noanswer").style.display = 'none';
				document.getElementById("allocatediv").style.display = 'none';
				document.getElementById("card1").innerHTML = "";								//hide cards (as they are reshuffled into the deck)
				document.getElementById("card2").innerHTML = "";
				document.getElementById("card3").innerHTML = "";
				cardcheck = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
				cardcount = 0;
				gameover = false;
				
				showingInstructions = false;
				gameInProgress = false;
				totalscore = 0;
				totalscorelastplay = 0;
				justIncreasedTotalScore = false;
				cardsOut = false;
				lastToScore = "nobody";

				document.getElementById("buttontext").innerHTML = "Start";
				
				if (isPractice === false && document.getElementById("reloadmessage").innerHTML === "Restart?"){		//restarting a score-keeping game mid-game to retain player names but reset scores
					playerscores = [0,0,0,0];
					document.getElementById("playersboard").style.display = 'block';
					
					document.getElementById("score1").innerHTML = 0;
					document.getElementById("score2").innerHTML = 0;
					document.getElementById("score3").innerHTML = 0;
					document.getElementById("score4").innerHTML = 0;	
				}
				else{
					firstgame = true; 
					document.getElementById("player1name").value = "";
					document.getElementById("player2name").value = "";
					document.getElementById("player3name").value = "";
					document.getElementById("player4name").value = "";
				}				
				
			}
			else{
				document.getElementById("restart1").style.display = 'inline-block';
			}
		}
		
		function reloadProgram2(){			//restart button to reload program
			gamechange = "";
			document.getElementById("restart1").style.display = 'none';
			document.getElementById("reloadmessage").innerHTML = "Restart?";
			document.getElementById("reloadmessage").style.display = 'inline-block';
			document.getElementById("progressbutton1").style.display = 'inline-block';
			document.getElementById("progressbutton2").style.display = 'inline-block';
			
		}
		
		function countingDown(countDownOn){
			if (countDownOn === true){
				document.getElementById("countdown2").checked = false;
				countDown = true;
			}
			else
			{
				document.getElementById("countdown1").checked = false;
				countDown = false;
			}
		}
		
		function nametruncator(number){
			tempname = "player" + number + "name";
			document.getElementById(tempname).value = document.getElementById(tempname).value.substring(0,12);
		}
		