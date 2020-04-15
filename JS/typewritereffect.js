//Declaring and Intialinzeing Objects
const Typewriter = function(txtElement, words, wait = 3000){
	this.txtElement = txtElement;
	this.words = words;
	this.txt = '';
	this.wordIndex = 0;
	this.wait = parseInt(wait, 10);
	this.type();
	this.isDeleting = false;
	
}

//Type Method
Typewriter.prototype.type = function() {
	
	//Current Index of word
	const current = this.wordIndex % this.words.length;
	
	//Get Full text of current word
	const fulltxt = this.words[current];
	
	//check if deleting
	if (this.isDeleting) {
		//Remove Character
		this.txt = fulltxt.substring(0, this.txt.length - 1);
		
	} else {
		//Add a character
		this.txt = fulltxt.substring(0, this.txt.length + 1);
		
	}
	
	//Insert text into element
	this.txtElement.innerHTML = `<span = "txt">${this.txt}</span>`;
	
	//Initialize Type Speed
	let typeSpeed = 300;
	
	if(this.isDeleting){
		typeSpeed /= 2;
		
	}
	
	//If word is complete
	if(!this.isDeleting && this.txt === fulltxt){
		// make pause at the end
		typeSpeed = this.wait; 
		//Set Delete to true
		this.isDeleting = true;
		
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		//Move to next word
		this.wordIndex++;
		//Pause Before next type
		typeSpeed = 500;
		
	}
	
	
	setTimeout(() => this.type(), typeSpeed)
}



//Initialize when DOM load
document.addEventListener('DOMContentLoaded', init);


//init App
function init(){
	const txtElement = document.querySelector('.txt-type');
	const words = JSON.parse(txtElement.getAttribute('data-words'));
	const wait = txtElement.getAttribute('data-wait');
	
	//Initialize the typewriter
	new Typewriter(txtElement, words, wait);
	
}