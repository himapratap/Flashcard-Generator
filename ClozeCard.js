var card;

var ClozeCard = function(text, cloze) {

    if (this instanceof ClozeCard) {
        this.fullText = text;
        this.cloze = cloze;
        if (text.indexOf(cloze) != -1) {
            this.partial = text.replace(cloze, '...');
        } else {
            var err = "ERROR:'" + text + "' does not contain the word '" + cloze + "'";
            throw err;
        }
        // console.log("Prompting..");
        // card = this;
        // this.prompt = function() {
        //     inquirer.prompt([{
        //         type: 'input',
        //         message: this.partial,
        //         name: "answer",
        //     }]).then(function(input) {
        //         console.log(card.cloze);
        //         console.log(input.answer);
        //         if (input.answer == card.cloze) {
        //             console.log("yaaay");
        //         } else {
        //             console.log("noooo");
        //         }
        //     });
        // }
        // console.log("Prompted..");

    } else {
        return new ClozeCard(text, cloze);
    }

}

module.exports = ClozeCard;
