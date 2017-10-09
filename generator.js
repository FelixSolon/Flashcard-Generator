//require the constructors
var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');

//As far as I can tell, I don't need any of the rest of the code to meet requirements.
//But.
//I'm a little bored and this seems like something I could legitimately put on a resume if I do it well.
//So I'm requiring a file system and inquirer
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
    //Switch statements are Bae. And a whole lot more organized (at least to me) than nested ifs.
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
            //Nested switch statements, because asynchronous.
            switch (answer.cardChoice){
                case 'Basic Card':
                //pull from the BasicCards.txt file
                fs.readFile("BasicCards.txt", "utf8", function(error, data){
                    if (error){
                        console.log(error);
                    }
                    //Pulls previously created cards out of the text file and parses them.
                    var basicCardArray = JSON.parse(data);
                    //makes a random number from 0 to basicCardArray.length -1 (because Math.floor makes arrays easy)
                    randomNumber = Math.floor(Math.random() * basicCardArray.length);
                    //inquirer is also bae
                    inquirer.prompt([
                    {
                        name: "card",
                        type: "input",
                        message: "Provide the answer: " + basicCardArray[randomNumber].front
                    }
                    ]).then(function(data){
                        //trim everything because I don't want this to become Matlab ("Sorry, you answered ' -3'. The correct answer was '-3'")
                        if (data.card.toLowerCase().trim() == basicCardArray[randomNumber].back.toLowerCase().trim()){
                            console.log("Correct! The answer was " + basicCardArray[randomNumber].back);
                        } else {
                            console.log("I'm sorry. The correct answer was '" + basicCardArray[randomNumber].back + "'")
                        };
                    });
                });
                //I don't want to run all the code.
                //So all right, team...
                break;

                //Pull a cloze card from the file
                case 'Cloze Card':
                fs.readFile("ClozeCards.txt", "utf8", function(error, data){
                    //totally unnecessary, because my code is perfect the first time every time.
                    if (error){
                        console.log(error);
                    }
                    //We all need arrays
                    //This is literally just copy pasted from the basic card bit, with names changed to protect the innocent/the scope.
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
        //Create a new cloze card
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
        }
        ]).then(function(answer){
            //use the constructor to make a new Cloze Card off the answer
            //ToDo: Attach a "user" attribute to allow people to create their own cards and only pull from their account.
            var newCard = new ClozeCard(answer.text.trim(), answer.cloze.trim());
            //create a temporary array so I can pull in old questions and not lose them.
            //I could use fs.appendFile and probably ignore this step
            //but I'm not sure that it won't screw itself up by losing commas, semi-colons, etc.
            //So I'm just writing one increasingly gigantic array of objects.
            var clozeCardArray = [];
            //ToDo: Throw all of this nested under fs.exists, and ignore the readFile step if the file doesn't exist yet.
            fs.readFile("ClozeCards.txt", "utf8", function(error, data){
                if (error){
                    console.log(error);
                    //I'm trying to figure out how to save the full text, but prompt again for the cloze if someone messes up.
                    //Not quite there yet, and think I'll need to refactor a lot.
                }
                //throw the parsed data into the array
                clozeCardArray = JSON.parse(data);
                //add the just constructed flashcard to the array
                clozeCardArray.push(newCard);
                //stringify the array. Which is just a fun word.
                //ToDo: Come up with a better variable name, though.
                var stringified = JSON.stringify(clozeCardArray);
                //Actually write the data to a file (technically, blow away the old file and write new data)
                //Which has absolutely no downsides like nuking everything if you screw up somewhere
                //or being a massively more expensive process, computationally.
                //Obviously.
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
        //Liiiterally copy pasted with the serial numbers filed off from the cloze card one. Refer there for comments.
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
                        console.log(err);
//Woo bracket closing pyramid!
                    };
                });
            });
        });
    };
});
