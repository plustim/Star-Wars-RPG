/************************
*                       *
*  battle game scripts  *
*                       *
************************/

// document ready
$(document).ready(function(){

	// variables
	// I can't help that I love arrays
	var characters = [
		{
			name: "Obi Wan",
			hp: 120,
			attack: 10
		},
		{
			name: "Luke Skywalker",
			hp: 120,
			attack: 10
		},
		{
			name: "Mace Windu",
			hp: 120,
			attack: 10
		},
		{
			name: "Darth Maul",
			hp: 120,
			attack: 10
		},
		{
			name: "Picard",
			hp: 120,
			attack: 10
		},
	];
	var player;
	var opponent;
	var wins = 0;

	// functions
	function attack(){
		// attack animation
		// attack calculation 
		// increase attack stat
		// hp animation
		// win check (return bool for result)
	}

	function defend(){
		// counter attack animation
		// counter attack calculation
		// hp animation
		// lose check (return bool for result)
	}

	// user clicks character
	$(".character-option").on("click", function(){
		// set player character
		player = characters[$(this).data("number")]; //todo: to give these elements data-number attr
		// show player character splash
		// generate options for opponents
		// show opponent selector
	});

	// user clicks opponent
	$(".character-opponent").on("click", function(){
		// set current opponent
		opponent = characters[$(this).data("number")];
		// show battle scene
	});

	// user clicks attack button
	$("#attack").on("click", function(){
		// disable attack button
		// attack
		var attackWon = attack();
		if( attackWon ){
			// end battle scene
		}else{
			// defend
			var counterWon = defend();
			if ( counterWon ){
				// game over
				// The force was not with you this time.
				// You were fighting Space-Wizards, what did you expect?
			}
		}
		// re-enable attack button
	});

};