var Basic = require("./Basic");
var Cloze = require("./ClozeCard");
var inquirer = require("inquirer");
var fs = require("fs");
// count for recursion
var count = 0;
// to get number correct
var score = 0;
// store questin objects
var basicArray = [];
var clozeArray = [];


Cloze.prototype.partial = function(){
		var res = this.text.replace(this.cloze, "...");
		return res;
	};

	function play(){	
inquirer.prompt([
	{
	type: "list",
	name: "pick",
	message: "Cloze or Basic Flash Card?",
	choices: ["basic","cloze"] 
	}

	]).then(function(answer){
		if(answer.pick === "basic"){
			basicAdd();
		} else{
			clozeAdd();
		}
	});

}
	function basic(x){
		if(x < basicArray.length){
		inquirer.prompt([
		{
			name: "continue",
			type: "confirm",
			message: basicArray[x].front
		}

			]).then(function(answer){
				// shows what the answer is 
				if(answer.continue){
					console.log(basicArray[x].back);
				}
				x++;
				basic(x);
			})
		}else{
			console.log(" you are done!");
			ask();
		}
	} // end of basic

	function cloze(x,y){
		if(x < clozeArray.length){
			inquirer.prompt([
			{
				type: "input",
				name: "answer",
				message: clozeArray[x].partial()

			}
				]).then(function(answer){
					// takes answer to lower cast to compare.
					if(answer.answer.toLowerCase() === clozeArray[x].cloze.toLowerCase()){
						console.log("correct!\n" + clozeArray[x].fullText);
						y++;
					} else{
						console.log("incorrect! the Answer was\n" + clozeArray[x].fullText);
					}
					x++;
					cloze(x,y);
				})
			
		} else{
			console.log("you are done! You got " + y + " out of " + x +" questions");
				ask();
		}
	}

	function basicAdd(){
		fs.readFile("basic.JSON", "utf8", function(err, data) {
        // Break the string down by comma separation and store the contents into the output array.
        if (err) {
            cosole.log(err);
        } 
        var output = JSON.parse(data);
        for(var i = 0; i < output.length; i++){
 		var BasicQuestion = new Basic(output[i].front, output[i].back);
 		basicArray.push(BasicQuestion);
    	}
        basic(count);
    	});
	}
		// adds the questions to the array
		function clozeAdd(){
		fs.readFile("Cloze.JSON", "utf8", function(err, data) {
        if (err) {
            cosole.log(err);
        } 
        var output = JSON.parse(data);
        for(var i = 0; i < output.length; i++){
 		var clozeQuestion = new Cloze(output[i].front, output[i].back);
 		clozeArray.push(clozeQuestion);
    	}
        console.log(cloze);
        cloze(count, score);
    	});
	}
	// play game again
	function ask(){
					inquirer.prompt([
				{
					type: "confirm",
					name: "confirmed",
					message: "Play again?"
				}

					]).then(function(answer){
						if(answer.confirmed){
							play();
							score = 0;
							count = 0;
							basicArray = [];
							clozeArray = [];
						} else{
							console.log("have fun!")
						}
					});
	}

// MAIN FUNCTION
// ---------------------------------------------------------------------------

play();

