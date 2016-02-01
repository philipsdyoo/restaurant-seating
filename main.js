$(document).ready(function() {
	var time = 0;
	var wait = 0;
	var tablenumbers = 10;
	var tables = {table1: null, table2: null, table3: null, table4: null, table5: null, table6: null, table7: null, table8: null, table9: null, table10: null};
	var queue = new Array();
	var type = $("input[name=type]:checked").val();
	$("#time").text(time);
	$("#next").click(function () {
		timePass();
	});
	$(document).keydown(function(event) {
		if (event.keyCode == 13 && type) {
			timePass();
		}
	});
	$("input[name=type]:radio").change(function() {
		type = $("input[name=type]:checked").val();
		if (type == "fifo") {
			$("#algodesc").text("AKA First-Come-First-Served. The group that has waited longest will be one to enter the restaurant next.");
		}
		else if (type == "largestfirst") {
			$("#algodesc").text("The restaurant will serve the first largest group in the queue before others.");
		}
		else if (type == "firstfit") {
			$("#algodesc").text("The first group in the queue that can fit into the restaurant will enter next.");	
		}
	});
	function timePass() {
		//Time variables updated
		time++;
		for (var i = 0; i < queue.length; i++) {
			queue[i].wait++;
		}
		for (var i = 1; i <= tablenumbers; i++) {
			var table = tables["table"+i];
			if (table) {
				table.countdown--;	
			}
		}
		if (type == "fifo") {
			$("#algodesc").text("First-In-First-Out is also known as First-Come-First-Served. The group that has waited longest will be one to enter the restaurant next.");
			FIFO();
		}
		else if (type == "largestfirst") {
			LargestFirst();
		}
		else if (type == "firstfit") {
			FirstFit();
		}

		//Customer arrival and add to Queue
		var arrivalChance = Math.floor((Math.random() * 5) + 1);
		if (arrivalChance == 1) {
			var customer = {
				number: 1,
				wait: 0,
				color: "red"
			};
			var numberChance = Math.floor((Math.random() * 20) + 1);
			if (numberChance <= 4) {
				//One person
				customer["number"] = 1;
				customer["color"] = 'red';
			}
			else if (numberChance >= 5 && numberChance <= 12) {
				//Two people
				customer["number"] = 2;
				customer["color"] = "orange";
			}
			else if (numberChance >= 13 && numberChance <= 16) {
				//Three people
				customer["number"] = 3;
				customer["color"] = "yellow";
			}
			else if (numberChance >= 17 && numberChance <= 18) {
				//Four people
				customer["number"] = 4;
				customer["color"] = "green";
			}
			else if (numberChance == 19) {
				//Five people
				customer["number"] = 5;
				customer["color"] = "blue";
			}
			else if (numberChance == 20) {
				//Six people
				customer["number"] = 6;
				customer["color"] = "purple";
			}
			queue.push(customer);

			$("#queue").css("height", (Math.floor((queue.length-1) / 10) + 1) * 50 + "px");
		}

		//Update Queue Information
		$(".customer").remove();
		for (var i = 0; i < queue.length; i++) {
			$("#queue").append("<div class='customer' style='background-color:" + queue[i].color + "'>Size: " + queue[i].number + "<br/><br/>" + queue[i].wait + "</div>");
		}

		//Update Table Information
		for (var i = 1; i <= tablenumbers; i++) {
			var table = tables["table"+i];
			if (table) {
				$("#table"+i).css("background-color", table.color).html("Size: " + table.number + "<br/><br/>" + table.countdown);
				if (table.countdown <= 0) {
					tables["table"+i] = null;
				}
			}
			else {
				$("#table"+i).css("background-color", "#ccc").html("");
			}
		}

		//Update Time Information
		$("#time").text(time);
		$("#wait").text(wait);
	}
	function FIFO() {
		if (queue.length > 0) {
			var available = TableAvailable(queue[0].number);
			if (available) {
				for (var i = 0; i < available.length; i++) {
					tables[available[i]] = {
						number: queue[0].number,
						countdown: queue[0].number * 10,
						color: queue[0].color
					};
				}
				wait += queue[0].wait - 1;
				queue.splice(0, 1);
			}
		}
	}
	function LargestFirst() {
		if (queue.length > 0) {
			var largestSize = 0;
			var largestFirst = 0;
			for (var i = 0; i < queue.length; i++) {
				if (queue[i].number > largestSize) {
					largestSize = queue[i].number;
					largestFirst = i;
				}
			}
			var available = TableAvailable(queue[largestFirst].number);
			if (available) {
				for (var j = 0; j < available.length; j++) {
					tables[available[j]] = {
						number: queue[largestFirst].number,
						countdown: queue[largestFirst].number * 10,
						color: queue[largestFirst].color
					};
				}
				wait += queue[largestFirst].wait - 1;
				queue.splice(largestFirst, 1);
			}
		}
	}
	function FirstFit() {
		if (queue.length > 0) {
			var firstfit = 0;
			var available = null;
			for (var i = 0; i < queue.length; i++) {
				available = TableAvailable(queue[i].number);
				if (available) {
					firstfit = i;
					break;
				}
			}
			if (available) {
				for (var j = 0; j < available.length; j++) {
					tables[available[j]] = {
						number: queue[firstfit].number,
						countdown: queue[firstfit].number * 10,
						color: queue[firstfit].color
					};
				}
				wait += queue[firstfit].wait - 1;
				queue.splice(firstfit, 1);
			}
		}
	}
	function TableAvailable(size) {
		var consecutive = 0;
		var available = new Array();
		for (var i = 1; i < tablenumbers; i+=5) {
			for (var j = i; j < (i+5); j++) {
				if (tables["table"+j] == null) {
					consecutive++;
					available.push("table"+j);
				}
				else {
					consecutive = 0;
				}
				if (consecutive == Math.floor((size+1)/2)) {
					return available;
				}
			}
			consecutive = 0;
			available = new Array();
		}
		return false;
	}
});