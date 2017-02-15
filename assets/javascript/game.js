    var wins = 0;
	var losses = 0;
    var letterCheck = /^[a-z]+$/;
    var winAudio = new Audio('assets/audio/wins.wav');
    var lossesAudio = new Audio('assets/audio/losses.wav');

	// hangman images 
    var hangmanDisplay = [
            "assets/images/skeleton_hangman-2.png",
            "assets/images/skeleton_hangman-3.png",
            "assets/images/skeleton_hangman-4.png",
            "assets/images/skeleton_hangman-5.png",
            "assets/images/skeleton_hangman-6.png",
            "assets/images/skeleton_hangman-7.png",
            "assets/images/skeleton_hangman-8.png",
            "assets/images/skeleton_hangman-9.png",
            "assets/images/skeleton_hangman-10.png",
            "assets/images/skeleton_hangman.png",
			"assets/images/skeleton_hangman.png"
        ],
        j;

	
    var wordList = [{
            theWord: "graveyard",
            theClue: "burried people"
        }, {
            theWord: "skeleton",
            theClue: "just bones left"
        }, {
            theWord: "headstone",
            theClue: "on top of a grave"
        }, {
            theWord: "dangerous",
            theClue: "not safe"
        }, {
            theWord: "creepy",
            theClue: "scarry"
        }, {
            theWord: "nightmare",
            theClue: "scarry dream"
        }, {
            theWord: "gargoyles",
            theClue: "creepy statues"
        }, {
            theWord: "psycho",
            theClue: "crazy, also a movie"
        }, {
            theWord: "reaper",
            theClue: "death"
        }, {
            theWord: "cemetery",
            theClue: "where people go after they die"
        }, {
            theWord: "mausoleum",
            theClue: "where people are layed to rest"
        }, {
            theWord: "scream",
            theClue: "loud yell"
        }, {
            theWord: "casket",
            theClue: "what are you burried in"
        }, {
            theWord: "zombies",
            theClue: "the walking dead"
        }

    ]

    function gameReady() {
        var playKey = 'Press any key to start playing!'
        document.querySelector('#playKeyDisplay').innerHTML = playKey;
    }

    gameReady();

    document.onkeyup = function gameSetup(event) {
        document.querySelector('#playKeyDisplay').innerHTML = '';

        var wordBlanks = [],
            i, k;
        var wordChoice = Math.floor(Math.random() * wordList.length);
        wordBlanks.push(wordList[wordChoice].theWord);
        for (k = 0; k < wordList[wordChoice].theWord.length; k++) {
            wordBlanks[k] = '_';
        }


        var wordBuildHtml = wordBlanks.join('  ');
        document.querySelector('#wordBuildDisplay').innerHTML = wordBuildHtml;
        var clueHTML = wordList[wordChoice].theClue;
        document.querySelector('#clueDisplay').innerHTML = clueHTML;
        var wrongGuessesRemain = 10;
        var hangmanStatus = [],
            j;
        var showSkeleton = "";
        var skeletonHTML = "";
        document.querySelector('#skeletoneDisplay').innerHTML = skeletonHTML;
        var hangmanHTML = hangmanStatus.join('  ');
        var wrongGuessesHtml = "You have " + wrongGuessesRemain + " wrong guesses left";
        document.querySelector('#hangmanDisplay').innerHTML = hangmanHTML;
        document.querySelector('#wrongGuessesDisplay').innerHTML = wrongGuessesHtml;


        console.log("word is " + wordList[wordChoice].theWord);
        console.log("definition is " + wordList[wordChoice].theClue);



        document.onkeyup = function gameGo(event) {
            document.querySelector('#playKeyDisplay').innerHTML = '';
            var playerEntry = String.fromCharCode(event.keyCode).toLowerCase();
            console.log("letter guessed:  " + playerEntry);

            for (i = 0; i < wordList[wordChoice].theWord.length; i++) {
                if (wordList[wordChoice].theWord[i] === playerEntry) {
                    wordBlanks[i] = wordList[wordChoice].theWord[i];
					
                    //display letter in the correct blanks					
                    var wordBuildHtml = wordBlanks.join('  ');
                    document.querySelector('#wordBuildDisplay').innerHTML = wordBuildHtml;
                    var blankCompare = wordBlanks.join('');
                    if (blankCompare == wordList[wordChoice].theWord) {
                        wins++;
                        winAudio.play();
                        confirmWin = 'YOU WIN!  Ready to Play Again!';
                        document.querySelector('#playKeyDisplay').innerHTML = confirmWin;
						
						// wins total up here						
                        var winsHtml = "You've won " + wins + " !";
                        document.querySelector('#winsDisplay').innerHTML = winsHtml;
						
						// game reset, duration						
                        setTimeout(gameSetup, 4500);
                    }
                }
            }

            if ((hangmanStatus.includes(playerEntry)) || (!playerEntry.match(letterCheck))) {
                console.log("Not a valid guess.");
                var noValidKey = 'Not a valid guess.'
                document.querySelector('#playKeyDisplay').innerHTML = noValidKey;
            } else if (!wordList[wordChoice].theWord.includes(playerEntry)) {
                hangmanStatus.push(playerEntry);
                wrongGuessesRemain--;

                for (j = 0; j < hangmanStatus.length; j++) {
                    j = hangmanStatus.indexOf(playerEntry);
                    if (hangmanStatus.length > 0) {
                        var showSkeleton = hangmanDisplay[j];
                        var skeletonHTML = "<img src='" + showSkeleton + "' alt='hang the skeleton as the player guesses wrong letters'>";
                        document.querySelector('#skeletoneDisplay').innerHTML = skeletonHTML;
                        var hangmanHTML = hangmanStatus.join('  ');
                        var wrongGuessesHtml = "You have " + wrongGuessesRemain + " wrong guesses left";
                        document.querySelector('#hangmanDisplay').innerHTML = hangmanHTML;
                        document.querySelector('#wrongGuessesDisplay').innerHTML = wrongGuessesHtml;
                    }
                }

            }
            if (hangmanStatus.length == 10) {
				losses++;
                lossesAudio.play();
                var confirmLoss = ('Bummer, The word is ' + wordList[wordChoice].theWord + '.');
                document.querySelector('#playKeyDisplay').innerHTML = confirmLoss;
				
				// losses total up here				
				var lossesHtml = "You have " + losses + " lose !";
                document.querySelector('#lossesDisplay').innerHTML = lossesHtml;
				
				// game reset, duration 
                setTimeout(gameSetup, 4500);
            }
        }
    }
