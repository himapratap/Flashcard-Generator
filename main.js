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
            if (input.answer == currentCard.cloze) {
                console.log("That's the correct answer!!");
                score++;
            } else {
                console.log("Sorry, the correct answer is: ", currentCard.cloze);
            }
            console.log("=============================================================");
            cardNo++;
            if (cardNo < clozeCards.length) {
                playClozeCards();
            } else {
                console.log("Hey your score is : ", score);

            }
        });


    }

    function playBasicCards() {
        console.log(" Playing card :", cardNo);
        currentCard = basicCards[cardNo];
        inquirer.prompt([{
            type: 'input',
            message: currentCard.front,
            name: "answer",
        }]).then(function(input) {
            if (input.answer == currentCard.back) {
                console.log("That's the correct answer!!");
                score++;

            } else {
                console.log("Sorry, the correct answer is: ", currentCard.back);
            }
            console.log("=============================================================");

            cardNo++;
            if (cardNo < basicCards.length) {
                playBasicCards();
            } else {
                console.log("Hey your score is : ", score);
            }
        });


    }
    var cards = []

    function initGame() {
        loadCards();
        console.log(" Hey, Let us play the World Fact !");
        inquirer.prompt([{
            type: 'list',
            message: 'So what do you want to play today?',
            name: "choice",
            choices: ["1.Basic Card Game", "2. Cloze Card Game", "3. Na , I'm leaving"]
        }]).then(function(input) {
            console.log(input.choice);
            var choice = input.choice;
            switch (choice) {
                case "3. Na , I'm leaving":
                    console.log("Have a great day ahead");
                    break;
                case '1.Basic Card Game':
                    playBasicCards();
                    break;

                case '2. Cloze Card Game':
                    playClozeCards();
                    break;
            }

        });


    }

    function loadCards() {
        console.log('Loading Cards ..');
        var clozeCardData = data.clozeCards;
        for (var i = 0; i < clozeCardData.length; i++) {
            clozeCards.push(ClozeCard(clozeCardData[i].text, clozeCardData[i].cloze));
        }
        var basicCardData = data.basicCards;
        for (var i = 0; i < basicCardData.length; i++) {
            basicCards.push(BasicCard(basicCardData[i].front, basicCardData[i].back));
        }
        console.log('Loading complete!');
    }

    initGame();


} catch (e) {
    console.log(e);
} finally {
    console.log("Done !");
}
