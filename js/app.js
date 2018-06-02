/*
 * Create a list that holds all of your cards
 */

 const cards = [ 'fa-diamond', 'fa-diamond',
 				 'fa-paper-plane-o','fa-paper-plane-o',
 				 'fa-anchor','fa-anchor',
 				 'fa-bolt','fa-bolt',
 				 'fa-cube','fa-cube',
 				 'fa-leaf','fa-leaf',
 				 'fa-bicycle','fa-bicycle',
 				 'fa-bomb','fa-bomb'
 			  	];

let openCard =[];
const scoreClass = document.querySelector('.moves');
const ratingClass = document.querySelectorAll('.fa-star');
const refreshClass = document.querySelector(".restart");
const deckClass = document.querySelector(".deck");
const modal = document.querySelector('.modal');
const closeSpan = document.querySelector('.close');
const tMoves = document.querySelector('.tMoves');
const tStar = document.querySelector('.tStar');
const timerSpan = document.querySelector('.timer');
const tTimer = document.querySelector('.tTimer');
let star;
let score;
let match;
let second=0;
let minutes=0;
let hours=0;
let interval;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function generateCard(card){
 	
 	return '<li class="card"><i class="fa '+ card+'"></i></li>';


 }

 function init(){
 	score =0;
 	match =0;
 	scoreClass.innerText = score;
 	star=3;
 	ratingUpdate();
 	genrateRandomCard();
 	enableClicking();
 }

 init();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
//enable clicking of card 
function enableClicking(){
	const cardList = document.querySelectorAll('.card');

	for(let card of cardList){
		card.addEventListener('click',function cardClicked(){
			if(!card.classList.contains('match') && !card.classList.contains('open') && !card.classList.contains('show') ){
				scoreChange();
				card.classList.add('open','show');
				openCard.push(card);
				if(openCard.length>2){
					closeOpenCard();
				}else if (openCard.length ==2){
					matchingCard();
				}
			}
		});
	}
}

//close open card
function closeOpenCard(){
	for(let i=0;i<2;i++){
		openCard[i].classList.remove('open', 'show');
	}
	openCard.splice(0,2);
}

//matching card
function matchingCard(){

	if(openCard[0].innerHTML===openCard[1].innerHTML){
		changeMatchClass();
		match = match +1;
		closeOpenCard();
		if(isMatchingComplete()){
			displayFinalScore();
		}
	}else{
		window.setTimeout(function(){
			if(openCard.length ==2){
				closeOpenCard();
			}
		},1000);
	}
}

function changeMatchClass(){
	for(let i=0;i<2;i++){
		openCard[i].classList.add('match');
	}

}

//score change
function scoreChange(){
	if(score === 0){
		startTimer();
	}
	score=score+1;
	scoreClass.innerText = score;
	ratingUpdate();
}

//rating update 
function ratingUpdate(){
	if(score <25){
		ratingClass[0].classList.remove("fa-star-o");
		ratingClass[0].classList.add("fa-star");
		ratingClass[1].classList.remove("fa-star-o");
		ratingClass[1].classList.add("fa-star");
		ratingClass[2].classList.remove("fa-star-o");
		ratingClass[2].classList.add("fa-star");
	}else if(score <45){
		star =2;
		ratingClass[2].classList.remove("fa-star");
		ratingClass[2].classList.add("fa-star-o");
	}else if(score<60){
		star =1;
		ratingClass[1].classList.remove("fa-star");
		ratingClass[1].classList.add("fa-star-o");
	}else{
		star =0;
		ratingClass[0].classList.remove("fa-star");
		ratingClass[0].classList.add("fa-star-o");
	}
}

//refresh button clicked 
refreshClass.addEventListener('click',function(){
	deckClass.innerHTML='';
	clearInterval(interval);
	second=0;
	minutes=0;
	timerSpan.innerHTML='00:00';
	init();
});

function genrateRandomCard(){
	let cardList='';
	let shuffledCards = shuffle(cards);
	for(let card of shuffledCards){
		let generated =generateCard(card);
		cardList=cardList+generated;
	}

	deckClass.innerHTML=cardList;
}

//check matching complete
function isMatchingComplete(){
	if(match===8){
		clearInterval(interval);
		return true;
	}
	return false;
}

//display matching box
function displayFinalScore(){
	modal.style.display ="block";
	tMoves.innerHTML =score;
	tStar.innerHTML=star;
	if(hours>0)
		tTimer.innerHTML= hours +':'+minutes+':'+second;
	else
		tTimer.innerHTML= minutes+':'+second;
}

closeSpan.addEventListener('click', function(){
	modal.style.display= "none";
});

window.addEventListener('click', function(event){
	if(event.target == modal){
		modal.style.display="none";
	}
});

//timer start
function startTimer(){
	clearInterval(interval);
	interval=setInterval(setTimer,1000);

}
function setTimer(){
	 let time =0;
	 second = second+1;
	 if(second<10){
	 	if (minutes>0)
	 		time=minutes+':0'+second;
	 	else
	 		time='0:0'+second;
	 }else if(second<60){
	 	if (minutes>0)
	 		time=minutes+':'+second;
	 	else
	 		time='0:'+second;
	 }else {
	 	minutes++;
	 	second=0;
	 	time = minutes+':00';
	 }

	 timerSpan.innerHTML = time;
}
