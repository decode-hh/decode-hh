/*global define */
// define([], function () {
//     'use strict';

//     return '\'Allo \'Allo!';
// });

var $node = $(document);

/* Toggle menu */
var $menu = $node.find('.menu');
$node.find('.menuButton').on('click', function(){
    $menu.toggleClass('active');
});

/* Counter */
var limit = 120;
var prevSecond = 0;
var prevMinute = 0;
var prevHour = 0;
var prevDay = 0;

var counter_seconds = $node.find('.js_counter_seconds');
var counter_minutes = $node.find('.js_counter_minutes');
var counter_hours = $node.find('.js_counter_hours');
var counter_days = $node.find('.js_counter_days');

var updateTime = function() {
	var date = new Date();
	var mill = date.getTime();
	var seconds = date.getSeconds();
	var minutes = date.getMinutes();
	var hours = date.getHours();
	var days = date.getDate();

	if(seconds != prevSecond) {
		insertTime(counter_seconds, seconds, prevSecond);
		prevSecond = seconds;
		flip(counter_seconds);
		console.log('Sekunden: ', seconds);
	}

	if(minutes != prevMinute) {
		insertTime(counter_minutes, minutes, prevMinute);
		prevMinute = minutes;
		flip(counter_minutes);
		console.log('Minuten: ', minutes);
	}

	if(hours != prevHour) {
		insertTime(counter_hours, hours, prevHour);
		prevHour = hours;
		flip(counter_hours);
		console.log('Stunden: ', hours);
	}

	if(days != prevDay) {
		insertTime(counter_days, days, prevDay);
		prevDay = days;
		flip(counter_days);
		console.log('Tage: ', days);
	}

	console.log(hours, minutes, seconds);
	if (limit--){
		var differenz = (new Date()).getTime() - mill;
		window.setTimeout(updateTime, Math.max(1000 - differenz, 1));
	}
}

function flip(counter){
	if(!counter.hasClass('flip')){
		counter.addClass('flip');
	} else {
		setTimeout(flip, 20, counter);
		counter.removeClass('flip');
	}
}

function createDezimals(value){
	if(value < 10){
		return '0' + value;
	} else {
		return value;
	}
}

function insertTime(counter, value, prevValue){
	counter.children()[0].dataset.time = createDezimals(prevValue);
	counter.children()[1].dataset.time = createDezimals(value);
}

updateTime();
