//------------------ service ------------------

function getAllUsers() {
	var users;
	jQuery.ajax({
		type : "GET",
		contentType : "application/json",
		url : "/tictactoegame/api/v1/players",
		async : false,
		success : function(data) {
			users = data;
		},
		error : function(e) {
			console.log(e);
		}
	});
	return users;
}

function addUser(name) {
	$.ajax({
		url : "api/v1/players/add",
		method : "POST",
		data : name,
		success : function() {
		}
	})
}

function isUserLogged(user) {
	var users = getAllUsers();
	for ( var item in users) {
		if (users[item].name == user) {
			return true;
		} else {
			return false;
		}
	}
}

function getCurrentUser() {
	var user;
	jQuery.ajax({
		type : "GET",
		url : "./api/v1/auth",
		async : false,
		success : function(oData) {
			user = oData;
		},
		error : function(e) {
			console.log(e);
		}
	});
	return user;
}

function getUnfinishedGame() {
	var username = getCurrentUser();
	jQuery.ajax({
		type : "GET",
		contentType : "application/json",
		url : "/tictactoegame/api/v1/players/" + username,
		async : false,
		success : function(data) {
			user = data;
		},
		error : function(e) {
			console.log(e);
		}
	});

	return user.unfinishedGame;
}

function setUnfinishedGame(unfinishedgame) {
	user = getCurrentUser();
	$.ajax({
		url : "./api/v1/players/update/" + user,
		method : "POST",
		data : unfinishedgame,
		success : function() {
		},
		error : function(e) {
			console.log(e);
		}
	})
}

// ------------------ game constants ------------------

var points = {
	"1" : "000",
	"2" : "100",
	"3" : "200",
	"4" : "010",
	"5" : "110",
	"6" : "210",
	"7" : "020",
	"8" : "120",
	"9" : "220",
	"10" : "001",
	"11" : "101",
	"12" : "201",
	"13" : "011",
	"14" : "111",
	"15" : "211",
	"16" : "201",
	"17" : "121",
	"18" : "221",
	"19" : "002",
	"20" : "102",
	"21" : "202",
	"22" : "012",
	"23" : "112",
	"24" : "212",
	"25" : "022",
	"26" : "122",
	"27" : "222"
};
var paths = [];

// Everything in the bottom level (z=0)
paths[0] = [ [ 0, 0, 0 ], [ 1, 0, 0 ], [ 2, 0, 0 ] ];
paths[1] = [ [ 0, 1, 0 ], [ 1, 1, 0 ], [ 2, 1, 0 ] ];
paths[2] = [ [ 0, 2, 0 ], [ 1, 2, 0 ], [ 2, 2, 0 ] ];
paths[3] = [ [ 0, 0, 0 ], [ 0, 1, 0 ], [ 0, 2, 0 ] ];
paths[4] = [ [ 1, 0, 0 ], [ 1, 1, 0 ], [ 1, 2, 0 ] ];
paths[5] = [ [ 2, 0, 0 ], [ 2, 1, 0 ], [ 2, 2, 0 ] ];
paths[6] = [ [ 0, 0, 0 ], [ 1, 1, 0 ], [ 2, 2, 0 ] ];
paths[7] = [ [ 2, 0, 0 ], [ 1, 1, 0 ], [ 0, 2, 0 ] ];

// Everything in the middle level (z=1)
paths[8] = [ [ 0, 0, 1 ], [ 1, 0, 1 ], [ 2, 0, 1 ] ];
paths[9] = [ [ 0, 1, 1 ], [ 1, 1, 1 ], [ 2, 1, 1 ] ];
paths[10] = [ [ 0, 2, 1 ], [ 1, 2, 1 ], [ 2, 2, 1 ] ];
paths[11] = [ [ 0, 0, 1 ], [ 0, 1, 1 ], [ 0, 2, 1 ] ];
paths[12] = [ [ 1, 0, 1 ], [ 1, 1, 1 ], [ 1, 2, 1 ] ];
paths[13] = [ [ 2, 0, 1 ], [ 2, 1, 1 ], [ 2, 2, 1 ] ];
paths[14] = [ [ 0, 0, 1 ], [ 1, 1, 1 ], [ 2, 2, 1 ] ];
paths[15] = [ [ 2, 0, 1 ], [ 1, 1, 1 ], [ 0, 2, 1 ] ];

// Everything in the top layer (z=2)
paths[16] = [ [ 0, 0, 2 ], [ 1, 0, 2 ], [ 2, 0, 2 ] ];
paths[17] = [ [ 0, 1, 2 ], [ 1, 1, 2 ], [ 2, 1, 2 ] ];
paths[18] = [ [ 0, 2, 2 ], [ 1, 2, 2 ], [ 2, 2, 2 ] ];
paths[19] = [ [ 0, 0, 2 ], [ 0, 1, 2 ], [ 0, 2, 2 ] ];
paths[20] = [ [ 1, 0, 2 ], [ 1, 1, 2 ], [ 1, 2, 2 ] ];
paths[21] = [ [ 2, 0, 2 ], [ 2, 1, 2 ], [ 2, 2, 2 ] ];
paths[22] = [ [ 0, 0, 2 ], [ 1, 1, 2 ], [ 2, 2, 2 ] ];
paths[23] = [ [ 2, 0, 2 ], [ 1, 1, 2 ], [ 0, 2, 2 ] ];

// All the straight columns
paths[24] = [ [ 0, 0, 0 ], [ 0, 0, 1 ], [ 0, 0, 2 ] ];
paths[25] = [ [ 1, 0, 0 ], [ 1, 0, 1 ], [ 1, 0, 2 ] ];
paths[26] = [ [ 2, 0, 0 ], [ 2, 0, 1 ], [ 2, 0, 2 ] ];
paths[27] = [ [ 0, 1, 0 ], [ 0, 1, 1 ], [ 0, 1, 2 ] ];
paths[28] = [ [ 1, 1, 0 ], [ 1, 1, 1 ], [ 1, 1, 2 ] ];
paths[29] = [ [ 2, 1, 0 ], [ 2, 1, 1 ], [ 2, 1, 2 ] ];
paths[30] = [ [ 0, 2, 0 ], [ 0, 2, 1 ], [ 0, 2, 2 ] ];
paths[31] = [ [ 1, 2, 0 ], [ 1, 2, 1 ], [ 1, 2, 2 ] ];
paths[32] = [ [ 2, 2, 0 ], [ 2, 2, 1 ], [ 2, 2, 2 ] ];

// All the diagonal columns - back to front
paths[33] = [ [ 0, 0, 0 ], [ 0, 1, 1 ], [ 0, 2, 2 ] ];
paths[34] = [ [ 1, 0, 0 ], [ 1, 1, 1 ], [ 1, 2, 2 ] ];
paths[35] = [ [ 2, 0, 0 ], [ 2, 1, 1 ], [ 2, 2, 2 ] ];

// All the diagonal columns - front to back
paths[36] = [ [ 0, 2, 0 ], [ 0, 1, 1 ], [ 0, 0, 2 ] ];
paths[37] = [ [ 1, 2, 0 ], [ 1, 1, 1 ], [ 1, 0, 2 ] ];
paths[38] = [ [ 2, 2, 0 ], [ 2, 1, 1 ], [ 2, 0, 2 ] ];

// All the diagonal columns - left to right
paths[39] = [ [ 0, 0, 0 ], [ 1, 0, 1 ], [ 2, 0, 2 ] ];
paths[40] = [ [ 0, 1, 0 ], [ 1, 1, 1 ], [ 2, 1, 2 ] ];
paths[41] = [ [ 0, 2, 0 ], [ 1, 2, 1 ], [ 2, 2, 2 ] ];

// All the diagonal columns - right to left
paths[42] = [ [ 2, 0, 0 ], [ 1, 0, 1 ], [ 0, 0, 2 ] ];
paths[43] = [ [ 2, 1, 0 ], [ 1, 1, 1 ], [ 0, 1, 2 ] ];
paths[44] = [ [ 2, 2, 0 ], [ 1, 2, 1 ], [ 0, 2, 2 ] ];

// All the diagonal columns - corner to corner
paths[45] = [ [ 0, 0, 0 ], [ 1, 1, 1 ], [ 2, 2, 2 ] ];
paths[46] = [ [ 0, 2, 0 ], [ 1, 1, 1 ], [ 2, 0, 2 ] ];
paths[47] = [ [ 2, 0, 0 ], [ 1, 1, 1 ], [ 0, 2, 2 ] ];
paths[47] = [ [ 2, 2, 0 ], [ 1, 1, 1 ], [ 0, 0, 2 ] ];

// ------------------ game logic ------------------

function computeColor(x, y, z) {
	return this.grid.charAt((z * 9) + (y * 3) + x);
}

function changeColor(x, y, z, color) {
	var before = this.grid.substr(0, (z * 9) + (y * 3) + x);
	var after = this.grid.substr((z * 9) + (y * 3) + x + 1);
	this.grid = before + color + after;
}

function otherPlayerColor() {
	if (this.currentPlayer == "R") {
		return "B";
	} else {
		return "R";
	}
}

function changePlayer() {
	this.winner();
	this.stalemate();
	this.currentPlayer = this.otherPlayer();
}

function checkForWinner() {
	for (var i = 0; i < paths.length; i++) {
		var first = paths[i][0];
		var second = paths[i][1];
		var third = paths[i][2];

		if (this.color(first[0], first[1], first[2]) == this.color(second[0],
				second[1], second[2])
				&& this.color(second[0], second[1], second[2]) == this.color(
						third[0], third[1], third[2])
				&& this.color(third[0], third[1], third[2]) == this.currentPlayer) {
			this.gameOver = true;

			$("#dialogDiv").removeAttr("style");
			if (this.currentPlayer == "R") {
				$("#dialogText").text("Red won the game!");
			} else {
				$("#dialogText").text("Green won the game!");
			}

			return true;
		}
	}
	return false;
}

function checkForStalemante() {
	var result = this.grid.indexOf("G") < 0;
	if (result) {
		this.gameOver = true;

		$("#dialogDiv").removeAttr("style");
		$("#dialogText").val("The game ended in a draw.");
	}
	return result;
}

function board(input, player1, player2, currentPlayer) {
	this.grid = input;
	this.currentPlayer = currentPlayer;
	this.player1 = player1;
	this.player2 = player2;

	this.gameOver = false;
	this.otherPlayer = otherPlayerColor;
	this.endTurn = changePlayer;
	this.color = computeColor;
	this.setColor = changeColor;
	this.winner = checkForWinner;
	this.stalemate = checkForStalemante;
}

function pathStatus(board, first, second, third) {
	this.friendly = 0;
	this.neutral = 0;
	this.enemy = 0;
	if (board.color(first[0], first[1], first[2]) == board.currentPlayer) {
		this.friendly++;
	}
	if (board.color(first[0], first[1], first[2]) == "G") {
		this.neutral++;
	}
	if (board.color(first[0], first[1], first[2]) == board.otherPlayer()) {
		this.enemy++;
	}
	if (board.color(second[0], second[1], second[2]) == board.currentPlayer) {
		this.friendly++;
	}
	if (board.color(second[0], second[1], second[2]) == "G") {
		this.neutral++;
	}
	if (board.color(second[0], second[1], second[2]) == board.otherPlayer()) {
		this.enemy++;
	}
	if (board.color(third[0], third[1], third[2]) == board.currentPlayer) {
		this.friendly++;
	}
	if (board.color(third[0], third[1], third[2]) == "G") {
		this.neutral++;
	}
	if (board.color(third[0], third[1], third[2]) == board.otherPlayer()) {
		this.enemy++;
	}
}

function divide(numerator, denominator) {
	var remainder = numerator % denominator;
	var quotient = (numerator - remainder) / denominator;

	return quotient;
}

function move(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
}

function doComputerMove(board) {

	var priorities = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0 ];
	if (!updatePrioritiesForWinning(board, priorities)) {
		if (!updatePrioritiesForBlockingOpponentFromWinning(board, priorities)) {
			updatePrioritesForWinningAndBlockingPaths(board, priorities);
		}
	}

	var maximum = -1;
	for (var i = 0; i < priorities.length; i++) {
		if (priorities[i] > maximum) {
			maximum = priorities[i];
		}
	}

	// More than one entry could have the maximum priority
	var entriesContainingTheMaximumPriority = [];
	for (var i = 0; i < priorities.length; i++) {
		if (priorities[i] == maximum) {
			entriesContainingTheMaximumPriority.push(i);
		}
	}

	var indexOfChosenPlay = Math.floor(Math.random()
			* entriesContainingTheMaximumPriority.length);
	var chosenPlay = entriesContainingTheMaximumPriority[indexOfChosenPlay];

	var z = divide(chosenPlay, 9);
	var y = divide(chosenPlay - (z * 9), 3);
	var x = chosenPlay % 3;

	board.setColor(x, y, z, board.currentPlayer);
	return new move(x, y, z);
}

function updatePrioritiesForWinning(board, priorities) {
	for (var i = 0; i < paths.length; i++) {
		var first = paths[i][0];
		var second = paths[i][1];
		var third = paths[i][2];

		var path = new pathStatus(board, first, second, third);
		if (path.friendly == 2 && path.neutral == 1) {
			if (board.color(first[0], first[1], first[2]) == "G") {
				priorities[first[0] + (first[1] * 3) + (first[2] * 9)]++;
			}
			if (board.color(second[0], second[1], second[2]) == "G") {
				priorities[second[0] + (second[1] * 3) + (second[2] * 9)]++;
			}
			if (board.color(third[0], third[1], third[2]) == "G") {
				priorities[third[0] + (third[1] * 3) + (third[2] * 9)]++;
			}
			return true;
		}
	}
	return false;
}

function updatePrioritiesForBlockingOpponentFromWinning(board, priorities) {
	for (var i = 0; i < paths.length; i++) {
		var first = paths[i][0];
		var second = paths[i][1];
		var third = paths[i][2];

		var path = new pathStatus(board, first, second, third);
		if (path.enemy == 2 && path.neutral == 1) {
			if (board.color(first[0], first[1], first[2]) == "G") {
				priorities[first[0] + (first[1] * 3) + (first[2] * 9)]++;
			}
			if (board.color(second[0], second[1], second[2]) == "G") {
				priorities[second[0] + (second[1] * 3) + (second[2] * 9)]++;
			}
			if (board.color(third[0], third[1], third[2]) == "G") {
				priorities[third[0] + (third[1] * 3) + (third[2] * 9)]++;
			}
			return true;
		}
	}
	return false;
}

function updatePrioritesForWinningAndBlockingPaths(board, priorities) {
	for (var i = 0; i < paths.length; i++) {
		var first = paths[i][0];
		var second = paths[i][1];
		var third = paths[i][2];

		var path = new pathStatus(board, first, second, third);
		if (path.neutral == 2) {
			if (board.color(first[0], first[1], first[2]) == "G") {
				priorities[first[0] + (first[1] * 3) + (first[2] * 9)]++;
			}
			if (board.color(second[0], second[1], second[2]) == "G") {
				priorities[second[0] + (second[1] * 3) + (second[2] * 9)]++;
			}
			if (board.color(third[0], third[1], third[2]) == "G") {
				priorities[third[0] + (third[1] * 3) + (third[2] * 9)]++;
			}
		}
	}
}

function startNewGame() {
	var newBoard;

	// checks if user has already logged: if he hasn't, add him to the database
	var user = getCurrentUser();
	if (!isUserLogged(user)) {
		addUser(user);
	}

	// checks if there is unfinishedGame in database. case1: there is unfinished
	// game, case2: start new game
	// GET request to DB
	var grid = getUnfinishedGame();
	// case1:
	if (grid != ("GGGGGGGGGGGGGGGGGGGGGGGGGGGH" || "GGGGGGGGGGGGGGGGGGGGGGGGGGGC")) {
		var rcounter = 0;
		var bcounter = 0;
		for (var i = 1; i < grid.length; i++) {
			if (grid[i] == "R") {
				rcounter++;
			}
			if (grid[i] == "B") {
				bcounter++;
			}
			var point = points[i];
			var selector = "div[boardx='" + point[0] + "'][boardy='" + point[1]
					+ "'][boardz='" + point[2] + "']";
			$(selector).addClass(grid[i - 1]);
		}
		console.log("rcounter: " + rcounter + "bcounter: " + bcounter);
		if ((rcounter > bcounter) || (rcounter == bcounter)) {
			currPlayer = 'B';
		} else {
			currPlayer = 'R';
		}
		if (grid[27] == "H") {
			player1 = "human";
			player2 = "computer";
		} else {
			player1 = "computer";
			player2 = "human";
		}
		newBoard = new board(grid, player1, player2, currPlayer);
		console.log("curent player: " + newBoard.currentPlayer,
				"first player: " + newBoard.player1);

		if ((newBoard.player1 == "computer") && (newBoard.currentPlayer == "R")) {
			var move = doComputerMove(newBoard);
			var selector = "div[boardx='" + move.x + "'][boardy='" + move.y
					+ "'][boardz='" + move.z + "']";
			$(selector).addClass(newBoard.currentPlayer);
			setUnfinishedGame(newBoard.grid);
			newBoard.endTurn();
		}
		console.log(newBoard);
	} else {
		// case2
		$("#dialogDiv").attr("style", "display:none");

		// determines who is the first player - human or computer
		var firstPlayer = $("#player1").children("div").html().toLowerCase();
		if (firstPlayer == "play first") {
			player1 = "human";
			player2 = "computer";
			newBoard = new board("GGGGGGGGGGGGGGGGGGGGGGGGGGGH", player1,
					player2, 'R');
		} else {
			player1 = "computer";
			player2 = "human";
			newBoard = new board("GGGGGGGGGGGGGGGGGGGGGGGGGGGC", player1,
					player2, 'R');
		}
		$(".tile").removeClass("R");
		$(".tile").removeClass("B");
		setUnfinishedGame(newBoard.grid);

		if (newBoard.player1 == "computer") {
			var move = doComputerMove(newBoard);
			var selector = "div[boardx='" + move.x + "'][boardy='" + move.y
					+ "'][boardz='" + move.z + "']";
			$(selector).addClass(newBoard.currentPlayer);
			setUnfinishedGame(newBoard.grid);
			newBoard.endTurn();
		}
	}
	return newBoard;
}

// ------------------ load game function ------------------
jQuery(function() {
	var currentBoard = startNewGame();
	$(".tile")
			.hover(
					function() {
						if (!currentBoard.gameOver) {
							var x = parseInt($(this).attr("boardx"));
							var y = parseInt($(this).attr("boardy"));
							var z = parseInt($(this).attr("boardz"));

							var tempBoard = new board(currentBoard.grid,
									currentBoard.player1, currentBoard.player2,
									currentBoard.currentPlayer);
							if (currentBoard.color(x, y, z) == 'G') {
								tempBoard.setColor(x, y, z,
										currentBoard.currentPlayer);
							}
						}
					}, function() {
						if (!currentBoard.gameOver) {
							setUnfinishedGame(currentBoard.grid);
						}
					});

	$(".tile")
			.click(
					function() {
						if (!currentBoard.gameOver) {
							var x = parseInt($(this).attr("boardx"));
							var y = parseInt($(this).attr("boardy"));
							var z = parseInt($(this).attr("boardz"));

							if (currentBoard.color(x, y, z) == 'G') {
								$(this).addClass(currentBoard.currentPlayer);

								currentBoard.setColor(x, y, z,
										currentBoard.currentPlayer);
								setUnfinishedGame(currentBoard.grid);

								if (currentBoard.winner()
										|| currentBoard.stalemate()) {
									// alert("finished");
								} else {
									currentBoard.endTurn();
									if ((currentBoard.currentPlayer == 'R' && currentBoard.player1 == "computer")
											|| (currentBoard.currentPlayer == 'B' && currentBoard.player2 == "computer")) {
										var move = doComputerMove(currentBoard);
										var selector = "div[boardx='" + move.x
												+ "'][boardy='" + move.y
												+ "'][boardz='" + move.z + "']";
										$(selector).addClass(
												currentBoard.currentPlayer);
										currentBoard.endTurn();
										setUnfinishedGame(currentBoard.grid);
									}
								}
							}
						}
					});

	$("li.option").click(function() {
		$(this).parent().siblings("div").html($(this).text());
		currentBoard.gameOver = true;
		setUnfinishedGame("GGGGGGGGGGGGGGGGGGGGGGGGGGGH");
		currentBoard = startNewGame();
	});

	$("#newGameButton").click(function() {
		setUnfinishedGame("GGGGGGGGGGGGGGGGGGGGGGGGGGGH");
		currentBoard = startNewGame();
		return false;
	});
});