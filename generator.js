//require the constructors
var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');

//As far as I can tell, I don't need any of the rest of the code to meet requirements.
//But.
//I'm a little bored and this seems like something I could legitimately put on a resume if I do it well.
//So I'm require a file system and inquirer
var fs = require('fs');
var inquirer = require('inquirer');

//Ask the user what they're looking to do.
inquirer.prompt([
    {
        name: 'choice',
        type: "list",
        message: "What would you like to do?",
        choices: ['Pull card', 'Create cloze card', 'Create basic card']
    }
]).then(function(answer){
    //Switch statements are Bae.
    switch (answer.choice){
        //Ask the user what kind of flashcard they want to pull
        case 'Pull card':
        inquirer.prompt([
        {
            name: "cardChoice",
            type: "list",
            message: "Cool. Would you like a Cloze Card or a Basic Card?",
            choices: ['Cloze Card', 'Basic Card']
        }
        ]).then(function(answer){
            switch (answer.cardChoice){
                case 'Basic Card':
                //pull from the BasicCards.txt file
                fs.readFile("BasicCards.txt", "utf8", function(error, data){
                    if (error){
                        console.log(error);
                    }
                    //Ok, so 
                    var basicCardArray = JSON.parse(data);
                    randomNumber = Math.floor(Math.random() * basicCardArray.length);
                    inquirer.prompt([
                    {
                        name: "card",
                        type: "input",
                        message: "Provide the answer: " + basicCardArray[randomNumber].front
                    }
                    ]).then(function(data){
                        if (data.card.toLowerCase().trim() == basicCardArray[randomNumber].back.toLowerCase().trim()){
                            console.log("Correct! The answer was " + basicCardArray[randomNumber].back);
                        } else {
                            console.log("I'm sorry. The correct answer was '" + basicCardArray[randomNumber].back + "'")
                        }
                    })
                });
                break;

                case 'Cloze Card':
                fs.readFile("ClozeCards.txt", "utf8", function(error, data){
                    if (error){
                        console.log(error);
                    }
                    clozeCardArray = JSON.parse(data);
                    randomNumber = Math.floor(Math.random() * clozeCardArray.length);
                    inquirer.prompt([
                    {
                        name: "card",
                        type: "input",
                        message: "Fill in the blank: " + clozeCardArray[randomNumber].partial
                    }
                    ]).then(function(data){
                        if (data.card.toLowerCase().trim() == clozeCardArray[randomNumber].cloze.toLowerCase().trim()){
                            console.log("Correct! The answer was " + clozeCardArray[randomNumber].fullText);
                        } else {
                            console.log("I'm sorry. The correct answer was '" + clozeCardArray[randomNumber].fullText + "'")
                        }
                    })
                });
            };
        });
        break;
        case 'Create cloze card':
        inquirer.prompt([
        {
            name: "text",
            type: "input",
            message: "Ok. What would you like the full text to be?",
        },
        {
            name: "cloze",
            type: "input",
            message: "Great. And what would you like the cloze to be?"
        }]).then(function(answer){
            var newCard = new ClozeCard(answer.text.trim(), answer.cloze.trim());
            var clozeCardArray = [];
            fs.readFile("ClozeCards.txt", "utf8", function(error, data){
                if (error){
                    console.log(error);
                }
                clozeCardArray = JSON.parse(data);
                console.log(clozeCardArray);
                clozeCardArray.push(newCard);
                var stringified = JSON.stringify(clozeCardArray);
                fs.writeFile("ClozeCards.txt", stringified, function(err, data){
                    if (err){
                        console.log("Error:");
                        console.log(err);
                    };
                });
            });
        });
        break;
        case 'Create basic card':
        console.log("Creating basic card");
        inquirer.prompt([
        {
            name: "front",
            type: "input",
            message: "Ok. What would you like the front of the card to be?",
        },
        {
            name: "back",
            type: "input",
            message: "Great. And what would you like the back of the card to be?"
        }]).then(function(answer){
            var newCard = new BasicCard(answer.front.trim(), answer.back.trim());
            var basicCardArray = [];
            fs.readFile("BasicCards.txt", "utf8", function(error, data){
                if (error){
                    console.log(error);
                }
                basicCardArray = JSON.parse(data);
                console.log(basicCardArray);
                basicCardArray.push(newCard);
                var stringified = JSON.stringify(basicCardArray);
                fs.writeFile("BasicCards.txt", stringified, function(err, data){
                    if (err){
                        console.log("Error:");
                        console.log(err);
                    };
                });
            });
        });
    };
});
