var countryGuessGame ={
    listObject: {
        afghanistan:{
            flag: "afg-flg.png"
        },
        austria: {
            flag: "aus-flg.png"
        },
        belgium: {
            flag: "bel-flg.png"
        },
        canada: {
            flag: "can-flg.png"
        },
        france: {
            flag: "fra-flg.png"
        },
        germany: {
            flag: "ger-flg.png"
        },
        haiti: {
            flag: "hai-flg.png"
        },
        india: {
            flag: "ind-flg.png"
        },
        japan: {
            flag: "jap-flg.png"
        },
        kenya: {
            flag: "ken-flg.png"
        },
        lebanon: {
            flag: "leb-flg.jpg"
        },
        netherlands: {
            flag: "net-flg.png"
        },
        poland: {
            flag: "pol-flg.png"
        },
        russia: {
            flag: "rus-flg.png"
        },
        spain: {
            flag: "spa-flg.png"
        },
        sweden: {
            flag: "swe-flg.png"
        },
        turkey: {
            flag: "tur-flg.png"
        },
        zimbabwe: {
            flag: "zim-flg.png"
        }
    },

    currentWord: null,
    currentWordLetters: [],
    correctLetters: [],
    guessedLetters: [],
    guessesLeft: 0,
    totalGuesses: 0,
    letterGuessed: null,
    wins: 0,

    initializeGame: function() {
        var objKeys = Object.keys(this.listObject);
        this.currentWord = objKeys[Math.floor(Math.random()* objKeys.length)];

        this.currentWordLetters = this.currentWord.split("")
        this.rebuildWordView();
        this.processUpdateTotalGuesses();
    },

    updatePage: function(letter) {
        if(this.guessesLeft === 0) {
            this.restartGame();
        }
        else {
            this.updateGuesses(letter);
            this.updateCorrectLetters(letter);
            this.rebuildWordView();
            if (this.updateWins() === true) {
                this.restartGame();
            }
        }
    },
    updateGuesses: function(letter) {
        if((this.guessedLetters.indexOf(letter) === -1) &&(this.currentWordLetters.indexOf(letter) === -1)) {
            this.guessedLetters.push(letter);
            this.guessesLeft--;
            document.querySelector("#guess-lim").innerHTML = this.guessesLeft;
            document.querySelector("#wrong-guess").innerHTML = this.guessedLetters.join(", ");
        }
    },
    processUpdateTotalGuesses: function() {
        this.totalGuesses = this.currentWordLetters.length + 5;
        this.guessesLeft = this.totalGuesses;
        document.querySelector("#guess-rem").innerHTML = this.guessesLeft;
    },
    updateCorrectLetters: function(letter) {
        for (i=0; i<this.currentWordLetters.length; i++) {
            if((letter === this.currentWordLetters[i]) && (this.correctLetters.indexOf(letter) === -1)) {
                this.matchedLetters.push(letter);
            }
        }
    },
    rebuildWordView: function() {
        var wordView = "";
        for(i=0; i<this.currentWordLetters.length; i++) {
            if (this.correctLetters.indexOf(this.currentWordLetters[i]) !== -1) {
                wordView += this.currentWordLetters[i];
            }
            else {
                wordView+= "&nbsp;_&nbsp;";
            }
        }
        document.querySelector("#current-word").innerHTML = wordView;
    },
    restartGame: function() {
        document.querySelector("#wrong-guess").innerHTML = "";
        this.currentWord = null;
        this.currentWordLetters = [];
        this.correctLetters = [];
        this.guessedLetters = [];
        this.guessesLeft = 0;
        this.totalGuesses = 0;
        this.letterGuessed = null;
        this.initializeGame();
        this.rebuildWordView();
    },
    updateWins: function() {
        var win;
        if( this.correctLetters.length === 0) {
            win = false;
        }
        else {
            win = true;
        }
        for (i=0; i<this.currentWordLetters.length; i++) {
            if (this.correctLetters.indexOf(this.currentWordLetters[i]) === -1) {
                win = false;
            }
        }
        if (win) {
            this.wins = this.wins +1;
            document.querySelector("winloss-int").innerHTML = this.wins;
            document.querySelector("#flag").innerHTML = "<img class='flag-image' src='../images/" + this.listObject[this.currentWord].flag + ">";
            return true;
        }
        return false;
    }
};

countryGuessGame.initializeGame();

document.onkeyup = function(event) {
    countryGuessGame.letterGuessed = String.fromCharCode(event.which).toLowerCase();
    countryGuessGame.updatePage(countryGuessGame.letterGuessed);
};