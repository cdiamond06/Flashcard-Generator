
function ClozeCard (text, cloze){
	this.text = text;
	this.cloze = cloze;
	this.fullText = text;

	// this.partial = function(){
	// 	var res = this.text.replace(this.cloze, "...");
	// 	return res;
	// }
}

module.exports = ClozeCard;