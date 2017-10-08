/*This file should define a Node module that exports a constructor for creating cloze-deletion flashcards, e.g.:
module.exports = ClozeCard;

The constructor should accept two arguments: text and cloze.
The constructed object should have a cloze property that contains only the cloze-deleted portion of the text.
The constructed object should have a partial property that contains only the partial text.
The constructed object should have a fullText property that contains only the full text.
The constructor should throw or log an error when the cloze deletion does not appear in the input text.
Use prototypes to attach these methods, wherever possible.*/

function ClozeCard(text, cloze){
    if (!(this instanceof ClozeCard)){
        return new ClozeCard(text, cloze);
    }
    //Makes sure that the cloze is in the text somewhere.
    //If yes, replaces the cloze with "..."
    //Otherwise yells at the user
    if (text.indexOf(cloze) >= 0){
        this.partial = text.replace(cloze, "...");
        this.cloze = cloze;
        this.fullText = text;
    } else {
        console.log("Please make sure your cloze matches the phrase in the input text you want removed. '" + cloze + "' was not found in the text.");
        return;
    };
    
};

module.exports = ClozeCard;