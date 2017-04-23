var ClozeCard = function(text, cloze) {
    this.fullText = text;
    this.cloze = cloze;
    if (text.indexOf(cloze) != -1) {
        this.partial = text.replace(cloze, '...');

    } else {
        var err = "ERROR:'" + text + "' does not contain the word '" + cloze + "'";
        throw err;
    }
}

module.exports = ClozeCard;
