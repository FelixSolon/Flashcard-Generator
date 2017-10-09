var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');
var fs = require('fs');
var inquirer = require('inquirer');

inquirer.prompt([
    {
        name: 'choice',
        type: "list",
        message: "What would you like to do?",
        choices: ['Pull card', 'Create cloze card', 'Create basic card']
    }
]).then(function(answer){
    console.log(answer);
    switch (answer.choice){
        case 'Pull card':
        console.log("This actually worked!");
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
            var newCard = new ClozeCard(answer.text, answer.cloze);
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
    }
});
