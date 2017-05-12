
var fs = require("fs");

var BasicCard = function(front, back){
	this.front = front;
	this.back = back;
}

// var basicArray = [];


module.exports = BasicCard;

// function readFile() {
//     fs.readFile("basic.JSON", "utf8", function(err, data) {
//         // Break the string down by comma separation and store the contents into the output array.
//         if (err) {
//             cosole.log(err);
//         }
//         var output = JSON.parse(data);
       
//         for(var i = 0; i < output.length; i++){
//         console.log(output[i].front);
//         console.log(output[i].back);
//         var basicQuestion = new BasicCard(output[i].front, output[i].back);
//         // basicArray.push(basicQuestion);
//     	}
//     	// console.log(basicArray);
//     	// console.log(basicArray[1].front);

        
//     });
// }
// readFile();



