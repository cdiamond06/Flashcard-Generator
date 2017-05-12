var Basic = require("./Basic");
var Cloze = require("./ClozeCard");
var inquirer = require("inquirer");
var fs = require("fs");

var count = 0;
var score = 0;



// Cloze.prototype.fullText  = this.text;
 var basicArray = [];

// console.log("Question 2");
// var qc1 = new Cloze("george washington was the first president", "george washington");
// var qc2 = new Cloze("John Adams was the second president", "John Adams");
// var qc3 = new Cloze("John Elway played for the denver broncos", "John Elway");
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
			// basic(count);
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
					// console.log(answer.answer.toLowerCase());
					// console.log(clozeArray[x].cloze.toLowerCase());
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
        // console.log("WHAT???")
        // console.log(output);
        for(var i = 0; i < output.length; i++){
 		var BasicQuestion = new Basic(output[i].front, output[i].back);
 		basicArray.push(BasicQuestion);
    	}
        // console.log(basicArray);
        basic(count);
    	});
	}

		function clozeAdd(){
		fs.readFile("Cloze.JSON", "utf8", function(err, data) {
        // Break the string down by comma separation and store the contents into the output array.
        if (err) {
            cosole.log(err);
        } 
        var output = JSON.parse(data);
        // console.log("WHAT???")
        // console.log(output);
        for(var i = 0; i < output.length; i++){
 		var clozeQuestion = new Cloze(output[i].front, output[i].back);
 		clozeArray.push(clozeQuestion);
    	}
        console.log(cloze);
        cloze(count, score);
    	});
	}

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
						} else{
							console.log("have fun!")
						}
					});
	}

// MAIN FUNCTION
// ---------------------------------------------------------------------------

play();

