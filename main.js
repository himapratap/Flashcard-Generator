var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var data = require("./questions.json");

try {
    var clozeCards = [];
    var basicCards = [];

    var currentCard;

    var cardNo = 0;
    var score = 0;

    function playClozeCards() {
        currentCard = clozeCards[cardNo];
        inquirer.prompt([{
            type: 'input',
            message: currentCard.partial,
            name: "answer",
        }]).then(function(input) {
            if (input.answer.toLowerCase() == currentCard.cloze.toLowerCase()) {
                console.log("That's the correct answer!!");
                score++;
            } else {
                console.log("Sorry, the correct answer is: ");
                console.log(currentCard.cloze);
            }
            console.log("=============================================================");
            cardNo++;
            if (cardNo < clozeCards.length) {
                playClozeCards();
            } else {
                console.log("You scored: ", score , " out of", cardNo );
                console.log("Game Over!");

            }
        });


    }

    function playBasicCards() {
        currentCard = basicCards[cardNo];
        inquirer.prompt([{
            type: 'input',
            message: currentCard.front,
            name: "answer",
        }]).then(function(input) {
            if (input.answer.toLowerCase() == currentCard.back.toLowerCase()) {
                console.log("That's the correct answer!!");
                score++;

            } else {
                console.log("Sorry, the correct answer is: ");
                console.log(currentCard.back);

            }
            console.log("=============================================================");

            cardNo++;
            if (cardNo < basicCards.length) {
                playBasicCards();
            } else {
                console.log("You scored: ", score , " out of ",cardNo);
                console.log("Game Over!");
            }
        });


    }
    var cards = []

    function initGame() {
        loadCards();
        console.log(" Welcome to the World Facts Quiz !");
        inquirer.prompt([{
            type: 'list',
            message: ' So what do you want to play today?',
            name: "choice",
            choices: ["1. Basic Card Game", "2. Cloze Card Game", "3. Nah, I'm leaving"]
        }]).then(function(input) {
            var choice = input.choice;
            switch (choice) {
                case "3. Na , I'm leaving":
                    console.log("Have a great day ahead");
                    break;
                case '1. Basic Card Game':
                    playBasicCards();
                    break;

                case '2. Cloze Card Game':
                    playClozeCards();
                    break;
            }

        });


    }

    function loadCards() {
        console.log(' Loading Game ..');
        var clozeCardData = data.clozeCards;
        for (var i = 0; i < clozeCardData.length; i++) {
            clozeCards.push(ClozeCard(clozeCardData[i].text, clozeCardData[i].cloze));
        }
        var basicCardData = data.basicCards;
        for (var i = 0; i < basicCardData.length; i++) {
            basicCards.push(BasicCard(basicCardData[i].front, basicCardData[i].back));
        }
        console.log(' Loading Complete!');
    }

    initGame();


} catch (e) {
    console.log(e);
}
