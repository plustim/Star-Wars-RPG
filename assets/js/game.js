/************************
*                       *
*  battle game scripts  *
*                       *
************************/

// document ready
$(document).ready(function(){

	// variables

	var characters = [
		{
			"name" : "Obi Wan",
			"portrait" : "assets/images/obiwan.png",
			"hp" : 120,
			"attack" : 10,
			"sound" : "assets/sounds/lightsaber.wav"
		},
		{
			"name" : "Luke",
			"portrait" : "assets/images/luke.png",
			"hp" : 120,
			"attack" : 10,
			"sound" : "assets/sounds/lightsaber.wav"
		}
	];
	var player;
	var charactersLeft = [];
	var opponent;
	var wins = 0;

	// functions
	function startGame(){
		var playerOptions = "";
		$.each(characters, function(index, value){
			charactersLeft.push(index);
			playerOptions += buildCharacter(index);
		});
		$("#player-options").html(playerOptions);
		$("#opponents").html("");
		$("#battle").html("");
	}

	function buildCharacter( id ){
		var card = "<div class='option' data-number='" + id + "'>
				<div class='portrait' style='background-image:url(" + characters[id].portrait + ");'>
				<h3>" + characters[id].name + "</h3>
				<div class='hp'></div>" + characters[id].hp + "
			</div>";
		return card;
	}

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
	$("#player-options").on("click", ".option", function(){
		// set player character
		player = characters[$(this).data("number")]; //todo: to give these elements data-number attr
		// show player character splash
		// populate options for opponents
		charactersLeft.splice( $(this).data("number"), 1 );
		// show opponents box
	});

	// user clicks opponent
	$("#opponents").on("click", "option", function(){
		// disable opponents box
		// set current opponent
		opponent = characters[$(this).data("number")];
		// remove opponent from opponents options
		charactersLeft.splice( $.inArray( $(this).data("number"), charactersLeft), 1 );
		// re-populate options for opponents
		var displayOpponents = "";
		$.each(charactersLeft, function(index, value){
			displayOpponents += "<div class='option' data-number='" + value + "'><div class='portrait' style='background-image:url(" + characters[index].portrait + ");'><h3>" + characters[index].name + "</h3><div class='full-hp'></div>" + characters[index].hp + "</div>";
		});
		$("#opponents").html(displayOpponents);
		// show battle scene
	});

	// user clicks attack button
	$("#battle").on("click", "#attack", function(){
		// disable attack button
		// attack
		var attackWon = attack();
		if( attackWon ){
			wins++;
			// end battle scene
			if( wins >= characters.length-1 ){
				// win game
			}else{
				// win notification
				// re-enable opponents box
			}
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