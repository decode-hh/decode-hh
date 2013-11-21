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

//updateTime();

// Twitter API Call
var tweets = [];
var lastTweet = [];
$.getJSON("scripts/tweets.json", function(data){
	tweets = data;
	lastTweet = tweets[0];

	createTweet(lastTweet.text, lastTweet.user.screen_name, lastTweet.created_at);
});

var date = [];
function createTweet(text, user, date){
	date = changeTimeStamp(date);
	var $tweet = $node.find('.tweet');
	console.log($tweet);
	$tweet.find('p').append(text);
	$tweet.find('cite a').append('@' + user).attr('href', 'http://twitter.com/' + user).after(' on ' + date);
}

function changeTimeStamp(datestamp){
	var date = new Date(
    datestamp.replace(/^\w+ (\w+) (\d+) ([\d:]+) \+0000 (\d+)$/,
        "$1 $2 $4 $3 UTC"));
	return date;
}




