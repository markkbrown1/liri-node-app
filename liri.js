// Make it so liri.js can take in one of the following commands:
// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says


var request = require('request');
var fs = require('fs');

// Grab data from keys.js file.
var keys = require('./keys.js');

// store keys in a variable.

var twitter = require('twitter');
var client = new twitter({
     consumer_key: keys.twitterKeys.consumer_key,
     consumer_secret: keys.twitterKeys.consumer_secret,
     access_token_key: keys.twitterKeys.access_token_key,
     access_token_secret: keys.twitterKeys.access_token_secret
});
// ask liri to get my tweets

var params ={screen_name: 'markykb', count: 10};
function myTweets(){
     client.get('statuses/user_timeline', params, function(error, tweets, response){
          if (!error) {
               for (var i = 0; i < tweets.length; i++) {
                    console.log(tweets[i].text + " Created on: " + tweets[i].created_at);
                    fs.appendFile('log.txt', tweets[i].text + " Created on: " + tweets[i].created_at + "\n");
               }
               fs.appendFile('log.txt', "=================================================================");
          } else {
               console.log(error);
          }
     });
}
myTweets();

// Set up function for spotify requests
var spotify = require('spotify');