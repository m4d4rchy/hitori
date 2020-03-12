var map = [[[5, 4, 4, 3, 4],
			[3, 4, 2, 5, 4],
			[2, 5, 5, 1, 2],
			[2, 2, 1, 4, 5],
			[4, 1, 5, 3, 2]], 
			
			[[4, 4, 4, 2, 2],
			[4, 2, 3, 5, 1],
			[1, 1, 2, 5, 4],
			[1, 3, 4, 1, 5],
			[3, 5, 4, 4, 1]],
		
			[[2, 2, 2, 5, 1],
			[5, 4, 2, 3, 4],
			[5, 1, 4, 5, 2],
			[2, 4, 5, 1, 3],
			[3, 5, 1, 1, 4]]];

var solve = [[[0, 0, 1, 0, 1],
			[0, 1, 0, 0, 0],
			[0, 0, 1, 0, 1],
			[1, 0, 0, 0, 0],
			[0, 0, 0, 1, 0]],
		
			[[1, 0, 1, 0, 1],
			[0, 0, 0, 0, 0],
			[0, 1, 0, 1, 0],
			[1, 0, 0, 0, 0],
			[0, 0, 1, 0, 1]],
		
			[[1, 0, 1, 0, 0],
			[0, 0, 0, 0, 1],
			[1, 0, 0, 1, 0],
			[0, 1, 0, 0, 0],
			[0, 0, 0, 1, 0]]];

var radios = document.getElementsByName('mode');
var size = 5;
var board = [];
var pause = 0;
var time = [0, 0, 0, -1];
var random = 0;
var timer = setInterval(function() {
	if (pause == 0) {
		time[3] = time[3] + 1;
		if (time[3] == 60) {
			time[3] = 0;
			time[2] = time[2] + 1;
		}
		if (time[2] == 60) {
			time[2] = 0;
			time[1] = time[1] + 1;
		}
		if (time[1] == 24) {
			time[1] == 0;
			time[0] == time[0] + 1;
		}
	}
	document.getElementById("timer").innerHTML = "Time: " + time[0] + "d " + time[1] + "h " + time[2] + "m " + time[3] + "s";
}, 1000);

$("#tableau:has(td)").click(function(e) {
	if (pause == 0) {
		var clickedcell= $(e.target).closest("td");
		var cellnum = $(clickedcell).index();
		var row = e.target.parentNode.rowIndex;
		var col = parseInt((cellnum % size));
		if (radios[1].checked == true)
			cellClickFR(clickedcell, row, col, cellnum);
		else
			cellClickSR(clickedcell, row, col, cellnum);
	}
});

$("#check").click(function() {
	if (pause == 0) {
		if (radios[1].checked) {
			if (getWinFR() == true) {
				alert("Well Played!\nYou finished in: " + time[0] + "d " + time[1] + "h " + time[2] + "m " + time[3] + "s");
				location.reload();
			}
			else
				time[3] = time[3] + 15;
		}
		else {
			if (getWinSR() == true) {
				alert("Well Played!\nYou finished in: " + time[0] + "d " + time[1] + "h " + time[2] + "m " + time[3] + "s");
				location.reload();
			}
			else
				time[3] = time[3] + 15;
		}
	}
});

$("#reset").click(function() {
	if (pause == 0) {
		$("td").removeClass("highlight");
		time[3] = -1;
		time[2] = 0;
		time[1] = 0;
		time[0] = 0;
		if (radios[1].checked) {
			resetGridFR();
		}
		else {
			resetGridSR();
		}
	}
});

$("#new").click(function() {
	if (pause == 0)
		location.reload();
});

$("#pause").click(function() {
	if (pause == 0) {
		pause = 1;
		document.getElementById("ptexte").innerHTML = "Pause";
	}
	else {
		pause = 0;
		document.getElementById("ptexte").innerHTML = "";
	}
});

$("#import").click(function() {
	var map = document.getElementById("map").files;
	var txt = readFile(map[0]);
});

function resetGridSR()
{
	var row = 0;
	var col = 0;

	while (row != size) {
		while (col != size) {
			board[row][col] = 0;
			col = col + 1;
		}
		col = 0;
		row = row + 1;
	}
}

function resetGridFR()
{
	var row = 0;
	var col = 0;
	var cellnum = 0;

	while (row != size) {
		while (col != size) {
			board[row][col] = parseInt($("#tableau td").eq(cellnum).html());
			col = col + 1;
			cellnum = cellnum + 1;
		}
		col = 0;
		row = row + 1;
	}
}

function cellClickFR(clickedcell, row, col, cellnum) 
{
	if ($(clickedcell).hasClass("highlight") == true) {
		$(clickedcell).removeClass("highlight");
		board[row][col] = parseInt($("#tableau td").eq(cellnum).html());
	}
	else {
		$(clickedcell).addClass("highlight");
		board[row][col] = -1;
	}
}

function cellClickSR(clickedcell, row, col, cellnum)
{
	if ($(clickedcell).hasClass("highlight") == true) {
		$(clickedcell).removeClass("highlight");
		board[row][col] = 0;
	}
	else {
		$(clickedcell).addClass("highlight");
		board[row][col] = 1;
	}
}

function readFile(readfile)
{
	var row = 0;
	var col = 0;
	var cellnum = 0;
	var reader = new FileReader();
	var count = 0;

	reader.onload = function(e) { 
		var contents = e.target.result;
		time = [0, 0, 0, -1];
		while (count != (size * size)) {
			$("#tableau td").eq(count).html(contents[count]);
			count = count + 1;
		}
		count = count + 1;
		while (row != size) {
			while (col != size) {
				solve[random][row][col] = parseInt(contents[count]);
				col = col + 1;
				cellnum = cellnum + 1;
				count = count + 1;
			}
			col = 0;
			row = row + 1;
		} 
	}
	reader.readAsText(readfile);
}

function getWinFR()
{
	var col = 0;
	var row = 0;
	var count = 0;

	while (count != size - 1) {
		if (col == size - 1) {
			row = row + 1;
			col = 0;
		}
		if (board[row][col] != -1 && checkNum(board[row][col], row, col) == false) {
			return (false);
		}
		col = col + 1;
		count = count + 1;
	}
	return (true);
}

function checkNum(num, row, col)
{
	var rowbis = row;
	var colbis = 0;

	while (colbis < size) {
		if (colbis == col)
			colbis = colbis + 1
		if (num == board[rowbis][colbis] && num != -1) {
			return (false);
		}
		colbis = colbis + 1;
	}
	colbis = col;
	rowbis = 0;
	while (rowbis < size) {
		if (rowbis == row)
			rowbis = rowbis + 1;
		if (rowbis < size && num == board[rowbis][colbis] && num != -1) {
			return (false);
		}
		rowbis = rowbis + 1;
	}
	return (true);
}

function getWinSR()
{
	var col = 0;
	var row = 0;
	var same = 0;

	while (row != size) {
		while (col != size) {
		if (board[row][col] == solve[random][row][col])
			same = same + 1;
		col = col + 1;
		}
		col = 0;
		row = row + 1;
	}
	if (same == (size * size))
		return(true);
	else
		return(false);
}

function setRandomFR()
{
	var cell = 0;
	var row = 0;
	var cellnum = 0;
	var value = 0;

	while (row != size) {
		board[row] = [];
		while (cell != size) {
			$("#tableau td").eq(cellnum).html(Math.floor(Math.random() * (9-1) + 1));
			value = $("#tableau td").eq(cellnum).html();
			board[row][cell] = parseInt(value);
			cellnum = cellnum + 1;
			cell = cell + 1;
		}
		cell = 0;
		row = row + 1;
	}
}

function setRandomSR()
{
	var cell = 0;
	var row = 0;
	var cellnum = 0;
	random = Math.floor(Math.random() * 3);

	while (row != size) {
		board[row] = [];
		while (cell != size) {
			$("#tableau td").eq(cellnum).html(map[random][row][cell]);
			board[row][cell] = 0;
			cellnum = cellnum + 1;
			cell = cell + 1;
		}
		cell = 0;
		row = row + 1;
	}
}

$(document).ready(function() {
	if (radios[1].checked == true)
		setRandomFR();
	else
		setRandomSR();
});