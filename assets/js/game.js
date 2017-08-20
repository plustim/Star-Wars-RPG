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
			"portrait" : "assets/images/placeholder.png",
			"hp" : 120,
			"attack" : 10,
			"sound" : "assets/sounds/lightsaber.wav"
		},
		{
			"name" : "Luke",
			"portrait" : "assets/images/placeholder.png",
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
		$("#player").html(playerOptions);
		$("#opponents").html("");
		$("#battle").html("");
	}

	function buildCharacter( id ){
		var card = "<div class='option' data-number='" + id + "'><div class='portrait' style='background-image:url(" + characters[id].portrait + ");'></div><h3>" + characters[id].name + "</h3><div class='hp-holder'><div class='hp'></div></div>" + characters[id].hp + "</div>";
		return card;
	}

	function attack(){
		// attack calculation 
		if( opponent.hp > player.attack ){
			opponent.hp -= player.attack;
		}else{
			opponent.hp = 0;
		}
		// increase attack stat
		player.attack += 1;
		// hp animation
		var hpBar = opponent.hp / character[opponent.id].hp * 100 + "%";
		$("#battle .hp").css("width", hpBar);
		// win check (return bool for result)
		return ( opponent.hp === 0 );
	}

	function defend(){
		// counter attack calculation
		if( player.hp > opponent.attack ){
			player.hp -= opponent.attack;
		}else{
			player.hp = 0;
		}
		// hp animation
		var hpBar = player.hp / character[player.id].hp * 100 + "%";
		$("#player .hp").css("width", hpBar);
		// lose check (return bool for result)
	}

	// user clicks character
	$("#player").on("click", ".option", function(){
		// set player character
		player = characters[$(this).data("number")];
		// show player character splash
		// populate options for opponents
		charactersLeft.splice( $(this).data("number"), 1 );
		// show opponents box
		var displayOpponents = "";
		$.each(charactersLeft, function(index, value){
			displayOpponents += buildCharacter( value );
		});
		$("#opponents").html(displayOpponents);
	});

	// user clicks opponent
	$("#opponents").on("click", ".option", function(){
		// disable opponents box
		// set current opponent
		opponent = characters[$(this).data("number")];
		// remove opponent from opponents options
		charactersLeft.splice( $.inArray( $(this).data("number"), charactersLeft), 1 );
		// re-populate options for opponents
		var displayOpponents = "";
		$.each(charactersLeft, function(index, value){
			displayOpponents += buildCharacter( value );
		});
		$("#opponents").html(displayOpponents);
		// show battle scene
	});

	// user clicks attack button
	$("#battle").on("click", "#attack", function(){
		// disable attack button
		// attack animation
		$("#player .option").css({"right": "100px", "transform": "rotate(-30deg)"});
		setTimeout(function() {
			$("#player .option").css({"right": "0px", "transform": "rotate(0deg)"});
		}, 300);
		// delay for attack animation
		setTimeout(function() {
			// attack
			var attackWon = attack();
			// delay for hp animation
			setTimeout(function() {
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
					$("#battle .option").css({"left": "100px", "transform": "rotate(30deg)"});
					setTimeout(function() {
						$("#battle .option").css({"left": "0px", "transform": "rotate(0deg)"});
					}, 300);
					// delay for counterattack animation
					setTimeout(function() {
						// defend
						var counterWon = defend();
						// delay for hp animation
						setTimeout(function() {
							if ( counterWon ){
								// game over
								// The force was not with you this time.
								// You were fighting Space-Wizards, what did you expect?
							}
							// re-enable attack button
						}, 600);
					}, 500);	
				}
			}, 600);
		}, 500);	
	});

	startGame();
});