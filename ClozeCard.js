function ClozeCard(text, cloze){
    //makes it scope safe
    if (!(this instanceof ClozeCard)){
        return new ClozeCard(text, cloze);
    }
    //Makes sure that the cloze is in the text somewhere.
    if (text.indexOf(cloze) >= 0){
    //If yes, replaces the cloze with "..."
        this.partial = text.replace(cloze, "...");
        this.cloze = cloze;
        this.fullText = text;
    //Otherwise logs an error.
    } else {
        throw new Error("Please make sure your cloze matches the phrase in the input text you want removed. '" + cloze + "' was not found in the text.");   
    };
    
};

module.exports = ClozeCard;