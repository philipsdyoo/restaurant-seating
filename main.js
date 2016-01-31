$(document).ready(function() {
	var time = 0;
	var wait = 0;
	var tablenumbers = 10;
	var tables = {
		table1: null,
		table2: null,
		table3: null,
		table4: null,
		table5: null,
		table6: null,
		table7: null,
		table8: null,
		table9: null,
		table10: null
	};
	var queue = new Array();
	$("#time").text(time);
	$("#next").click(function () {
		timePass();
	});
	$(document).keydown(function(event) {
		if (event.keyCode == 13) {
			timePass();
		}
	});
	function timePass() {
		//Time variables updated
		time++;
		for (var i = 0; i < queue.length; i++) {
			queue[i].wait++;
		}
		for (var i = 0; i < tablenumbers; i++) {
			var table = tables["table"+i];
			if (table) {
				table.countdown--;	
			}
		}
		FirstBestFit();

		//Customer arrival and add to Queue
		var arrivalChance = Math.floor((Math.random() * 6) + 1);
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
			//console.log(queue);

			$("#queue").css("height", (Math.floor(queue.length / 11) + 1) * 150 + "px");
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

	}
	function LargestFirst() {

	}
	function FirstBestFit() {
		if (queue.length > 0) {
			var entered = new Array();
			for (var i = 0; i < queue.length; i++) {
				var available = TableAvailable(queue[i].number);
				if (available) {
					for (var j = 0; j < available.length; j++) {
						tables[available[j]] = {
							number: queue[i].number,
							countdown: queue[i].number * 10,
							color: queue[i].color
						};
					}
					entered.push(i);
					wait += queue[i].wait - 1;
				}
			}
			for (var i = 0; i < entered.length; i++) {
				queue.splice(entered[i], 1);
			}
		}
		//console.log(tables);
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