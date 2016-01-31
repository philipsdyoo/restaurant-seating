$(document).ready(function() {
	var time = 0;
	var wait = 0;
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
		if (event.keyCode == 32) {
			timePass();
		}
	});
	function timePass() {
		time++;
		$("#time").text(time);
		for (var i = 0; i < queue.length; i++) {
			queue[i].wait++;
			//console.log(queue);
		}
		var arrivalChance = Math.floor((Math.random() * 4) + 1);
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
			$("#queue").append("<div class='customer' style='background-color:" + customer["color"] + "'>Size: " + customer["number"] + "</div>");
			//console.log(queue);
		}
	}	
});