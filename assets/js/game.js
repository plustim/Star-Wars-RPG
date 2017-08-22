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
			"name" : "Rey",
			"portrait" : "assets/images/rey.jpg",
			"hp" : 120,
			"attack" : 8,
			"counter" : 10
		},
		{
			"id" : 1,
			"name" : "Finn",
			"portrait" : "assets/images/finn.jpg",
			"hp" : 150,
			"attack" : 6,
			"counter" : 20
		},
		{
			"id" : 2,
			"name" : "Kylo Ren",
			"portrait" : "assets/images/kylo.jpg",
			"hp" : 180,
			"attack" : 4,
			"counter" : 25
		},
		{
			"id" : 3,
			"name" : "BB-8",
			"portrait" : "assets/images/bb8.jpg",
			"hp" : 100,
			"attack" : 13,
			"counter" : 5
		}
	];
	var player;
	var charactersLeft = [];
	var opponent;
	var wins;

	// sound effects
	var hit = [
		new Audio("assets/sounds/hit0.wav"),
		new Audio("assets/sounds/hit1.wav"),
		new Audio("assets/sounds/hit2.wav"),
		new Audio("assets/sounds/hit3.wav"),
		new Audio("assets/sounds/hit4.wav"),
		new Audio("assets/sounds/hit5.wav")
		];

	// functions
	function startGame(){
		wins = 0;
		charactersLeft = [];
		var playerOptions = "";
		$.each(characters, function(index, value){
			charactersLeft.push(index);
			playerOptions += buildCharacter(index, "option");
		});
		$("#player").html(playerOptions).css("width", "100%");
		$("#opponents").html("");
		$("#battle").html("").css("width", 0);
		$("#vs").css("width", 0);
		$("#notification").html("<p>Select your character.</p>");
	}

	function buildCharacter(){
		var id = arguments[0];
		var classString = "character";
		$.each(arguments, function(index, value){
			classString += " " + value;
		});
		var card = "<div class='" + classString + "' data-number='" + id + "'><h3>" + characters[id].name + "</h3><div class='portrait' style='background-image:url(" + characters[id].portrait + ");'></div><div class='hp-holder'><div class='hp'></div></div><span>" + characters[id].hp  + "</span> / " + characters[id].hp  + "</div>";
		return card;
	}

	function attack(){
		// attack calculation 
		opponent.hp = (opponent.hp > player.attack) ? opponent.hp - player.attack : 0;
		console.log("You attacked " + opponent.name + " for " + player.attack + " damage.");
		// increase attack stat
		player.attack += characters[player.id].attack;
		// hp animation
		var hpBar = opponent.hp / characters[opponent.id].hp * 100 + "%";
		$("#battle .hp").css("width", hpBar);
		// win check (return bool for result)
		return ( opponent.hp === 0 );
	}

	function defend(){
		// counter attack calculation
		player.hp = (player.hp > opponent.counter) ? player.hp - opponent.counter : 0;
		console.log(opponent.name + " attacked you for " + opponent.counter + " damage.");
		// hp animation
		var hpBar = player.hp / characters[player.id].hp * 100 + "%";
		$("#player .hp").css("width", hpBar);
		// lose check (return bool for result)
		return ( player.hp === 0 );
	}

	// user clicks character
	$("#player").on("click", ".option", function(){
		// set player character
		player = $.extend({}, characters[$(this).data("number")]);
		// show player character splash
		$(this).removeClass("option");
		$("#player .option").removeClass("option").addClass("invis");
		// populate options for opponents
		charactersLeft.splice( $(this).data("number"), 1 );
		// show opponents box
		var displayOpponents = "";
		$.each(charactersLeft, function(index, value){
			displayOpponents += buildCharacter( value, "invis" );
		});
		$("#opponents").html(displayOpponents);
		setTimeout(function() {
			$("#player .invis").addClass("fold");
			setTimeout(function() {
				$("#player").css("width", "250px");
				$(".fold").css("display", "none");
				$("#opponents .character").removeClass("invis").addClass("option");
				$("#notification").html("<p>Select your first opponent.</p>");
			}, 200);
		}, 200);
	});

	// user clicks opponent
	$("#opponents").on("click", ".option", function(){
		// disable opponents box
		// set current opponent
		opponent = $.extend({}, characters[$(this).data("number")]);
		// remove opponent from opponents options
		charactersLeft.splice( $.inArray( $(this).data("number"), charactersLeft), 1 );
		$("#opponents .option").removeClass("option").addClass("fade");
		$(this).addClass("invis");
		// show battle scene
		$("#notification").html("<p>Fight!</p>");
		$("#battle").html(buildCharacter($(this).data("number")));
		$("#battle, #vs").css("width", "250px");
		setTimeout(function() {
			$("#opponents .invis").addClass("fold");
			$("#battle .character").css({"top": "0px", "opacity": 1});
			$("#vs").css("height", "30px");
		}, 200);
	});

	// user clicks attack button
	$("#attack").on("click", function(){
		// disable attack button
		$("#vs").css("height", "0px");
		// attack animation
		var rando1 = Math.floor(Math.random()*6);
		var rando2 = rando1;
		while( rando2 === rando1 ){
			rando2 = Math.floor(Math.random()*6);
		}
		hit[rando1].play();
		$("#player .character").css({"left": "500px", "transform": "rotate(30deg)", "z-index": "100"});
		setTimeout(function() {
			$("#player .character").css({"left": "0px", "transform": "rotate(0deg)", "z-index": "99"});
		}, 200);
		// delay for attack animation
		setTimeout(function() {
			// attack
			var attackWon = attack();
			// delay for hp animation
			setTimeout(function() {
				$("#battle .character span").html(opponent.hp);
				if( attackWon ){
					wins++;		
					$("#battle .character").css({"top": "-100px", "opacity": 0});
					// end battle scene
					if( wins >= characters.length-1 ){
						// win game
						$("#battle, #vs").css("width", "0px");
						$("#notification").html("<p>You Win!<br><button>Play again?</button></p>");
					}else{
						// win notification
						console.log("You defeated " + opponent.name + ".");
						// re-enable opponents box
						$("#notification").html("<p>Select your next opponent.</p>");
						$("#opponents .character").removeClass("fade").addClass("option");
					}
				}else{
					$("#player .character").css("z-index", "97");
					$("#battle .character").css({"left": "-500px", "transform": "rotate(-30deg)", "z-index": "100"});
					hit[rando2].play();
					setTimeout(function() {
						$("#battle .character").css({"left": "0px", "transform": "rotate(0deg)", "z-index": "98"});
					}, 200);
					// delay for counterattack animation
					setTimeout(function() {
						// defend
						var counterWon = defend();
						// delay for hp animation
						setTimeout(function() {
							$("#player .character span").html(player.hp);
							if ( counterWon ){
								// game over
								console.log("Your health has reached zero. You lose.");
								$("#notification").html("<p>The force was not with you this time.<br><button>Play again?</button></p>");
								// The force was not with you this time.
								// You were fighting Space-Wizards, what did you expect?
							}else{
								// re-enable attack button
								$("#vs").css("height", "30px");
							}
						}, 400);
					}, 500);	
				}
			}, 400);
		}, 700);	
	});

	$("#notification").on("click", "button", function(){

		startGame();
	});

	startGame();
});