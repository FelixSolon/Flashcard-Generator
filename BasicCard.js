/*This file should define a Node module that exports a constructor for creating basic flashcards, e.g.:
module.exports = BasicCard;

The constructor should accept two arguments: front and back.
The constructed object should have a front property that contains the text on the front of the card.
The constructed object should have a back property that contains the text on the back of the card.*/

function BasicCard (front, back){
    //making it scope safe. I really like this concept, it's clever.
    if (!(this instanceof BasicCard)){
        return new BasicCard(front, back);
    }
    this.front = front;
    this.back = back;
};

module.exports = BasicCard;

var firstPresident = new BasicCard(
    "Who was the first president of the United States?", "George Washington");

// "Who was the first president of the United States?"
console.log(firstPresident.back); 