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
			"id" : 0,
			"name" : "Obi Wan",
			"portrait" : "assets/images/placeholder.png",
			"hp" : 120,
			"attack" : 10,
			"sound" : "assets/sounds/lightsaber.wav"
		},
		{
			"id" : 1,
			"name" : "Mace Windu",
			"portrait" : "assets/images/placeholder.png",
			"hp" : 120,
			"attack" : 10,
			"sound" : "assets/sounds/lightsaber.wav"
		},
		{
			"id" : 2,
			"name" : "Yoda",
			"portrait" : "assets/images/placeholder.png",
			"hp" : 120,
			"attack" : 10,
			"sound" : "assets/sounds/lightsaber.wav"
		},
		{
			"id" : 3,
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
		var card = "<div class='option' data-number='" + id + "'><h3>" + characters[id].name + "</h3><div class='portrait' style='background-image:url(" + characters[id].portrait + ");'></div><div class='hp-holder'><div class='hp'></div></div><span>" + characters[id].hp  + "</span> / " + characters[id].hp  + "</div>";
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
		player.attack += 10;
		// hp animation
		var hpBar = opponent.hp / characters[opponent.id].hp * 100 + "%";
		console.log(opponent.hp, characters[opponent.id].hp, hpBar);
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
		var hpBar = player.hp / characters[player.id].hp * 100 + "%";
		$("#player .hp").css("width", hpBar);
		// lose check (return bool for result)
	}

	// user clicks character
	$("#player").on("click", ".option", function(){
		// set player character
		player = $.extend({}, characters[$(this).data("number")]);
		// show player character splash
		$("#player").html(buildCharacter($(this).data("number"))).css("width", "300px");
		$("#player .option").css("cursor", "auto");
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
		opponent = $.extend({}, characters[$(this).data("number")]);
		// remove opponent from opponents options
		charactersLeft.splice( $.inArray( $(this).data("number"), charactersLeft), 1 );
		// re-populate options for opponents
		var displayOpponents = "";
		$.each(charactersLeft, function(index, value){
			displayOpponents += buildCharacter( value );
		});
		displayOpponents += "<div id='opponentMask'></div>";
		$("#opponents").html(displayOpponents);
		// show battle scene
		$("#battle").html(buildCharacter($(this).data("number")));
		$("#battle, #vs").css("display", "inline-block");
		setTimeout(function() {
			$("#battle .option").css({"top": "0px", "opacity": 1});
			$("#vs").css("height", "30px");
		}, 100);
	});

	// user clicks attack button
	$("#attack").on("click", function(){
		// disable attack button
		$("#vs").css("height", "0px");
		// attack animation
		$("#player .option").css({"left": "500px", "transform": "rotate(30deg)", "z-index": "100"});
		setTimeout(function() {
			$("#player .option").css({"left": "0px", "transform": "rotate(0deg)", "z-index": "99"});
		}, 200);
		// delay for attack animation
		setTimeout(function() {
			// attack
			var attackWon = attack();
			// delay for hp animation
			setTimeout(function() {
				$("#battle .option span").html(opponent.hp);
				if( attackWon ){
					wins++;		
					$("#battle .option").css({"top": "-100px", "opacity": 0});
					// end battle scene
					if( wins >= characters.length-1 ){
						// win game
					}else{
						// win notification
						// re-enable opponents box
						$("#opponentMask").css("display", "none");
					}
				}else{
					$("#player .option").css("z-index", "97");
					$("#battle .option").css({"left": "-500px", "transform": "rotate(-30deg)", "z-index": "100"});
					setTimeout(function() {
						$("#battle .option").css({"left": "0px", "transform": "rotate(0deg)", "z-index": "98"});
					}, 200);
					// delay for counterattack animation
					setTimeout(function() {
						// defend
						var counterWon = defend();
						// delay for hp animation
						setTimeout(function() {
							$("#player .option span").html(player.hp);
							if ( counterWon ){
								// game over
								// The force was not with you this time.
								// You were fighting Space-Wizards, what did you expect?
							}
							// re-enable attack button
							$("#vs").css("height", "30px");
						}, 400);
					}, 500);	
				}
			}, 400);
		}, 700);	
	});

	startGame();
});