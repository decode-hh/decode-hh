/*global define */
// define([], function () {
//     'use strict';

//     return '\'Allo \'Allo!';
// });

var $node = $(document);

/* Toggle menu */
var $menu = $node.find('.menu');
function toggleMenu(){
	$menu.toggleClass('active');
}
$node.find('.menuButton').on('click', toggleMenu);
$menu.on('click', toggleMenu);

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

var remainingTime = {
	'days' : 0,
	'hours' : 0,
	'minutes' : 0,
	'seconds' : 0
};

var updateTime = function() {
	var date = new Date();
	var dateMill = date.getTime();
	var eventDate = new Date('12 4 2013 19:00');
	var eventDateMill = eventDate.getTime();

	function calcDate(milliseconds){
		remainingTime.seconds = Math.floor((milliseconds / 1000) % 60);
		remainingTime.minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
		remainingTime.hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
		remainingTime.days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
	}
	calcDate(eventDateMill - dateMill);

	if(remainingTime.seconds != prevSecond) {
		insertTime(counter_seconds, remainingTime.seconds, prevSecond);
		prevSecond = remainingTime.seconds;
		flip(counter_seconds);
	}

	if(remainingTime.minutes != prevMinute) {
		insertTime(counter_minutes, remainingTime.minutes, prevMinute);
		prevMinute = remainingTime.minutes;
		flip(counter_minutes);
	}

	if(remainingTime.hours != prevHour) {
		insertTime(counter_hours, remainingTime.hours, prevHour);
		prevHour = remainingTime.hours;
		flip(counter_hours);
	}

	if(remainingTime.days != prevDay) {
		insertTime(counter_days, remainingTime.days, prevDay);
		prevDay = remainingTime.days;
		flip(counter_days);
	}

	if (limit--){
		var differenz = (new Date()).getTime() - (dateMill);
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

// Twitter API Call
var tweets = [];
var lastTweet = [];
$.getJSON("scripts/tweets.json", function(data){
	tweets = data;
	lastTweet = tweets[0];
	var lastTweetDate = new Date(lastTweet.created_at);
	var computedText = 

	createTweet(lastTweet.text, lastTweet.user.screen_name, lastTweetDate);
});

function wrap( str ) {
    return '<a href="' + str + '" target="_blank">' + str + '<\/a>';
};
	
function createTweet(text, user, date){
	var options = {
	    weekday: "long", year: "numeric", month: "short",
	    day: "numeric", hour: "2-digit", minute: "2-digit"
	};
	var $tweet = $node.find('.tweet');
	$tweet.find('p').append(text.replace(/\bhttp[^ ]+/ig, wrap));
	$tweet.find('cite a').append('@' + user).attr('href', 'http://twitter.com/' + user).after(' on ' + date.toLocaleTimeString("en-us", options));
}




