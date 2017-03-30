// Make it so liri.js can take in one of the following commands:
// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says


var request = require('request');
var fs = require('fs');
var argOne = process.argv[2];
var argTwo = process.argv[3];

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
// myTweets();

// Set up function for spotify requests
var spotify = require('spotify');
function getSong() {
     if (argTwo === undefined) {
          argTwo === "The Sign";
     };
     spotify.search({ type: 'track', query: argTwo}, function(err, data) {
         if ( err ) {
             console.log('Error occurred: ' + err);
             return;
         }
         var result = data.tracks.items;
         console.log("Artist: " + result[0].artists[0].name);
         console.log("Song Name: " + result[0].name);
         console.log("Spotify Preview Link: " + result[0].external_urls.spotify);
         console.log("Album: " + result[0].album.name);
         fs.appendFile('log.txt', "Artist: " + result[0].artists[0].name + "\n" + "Song Name: " + result[0].name + "\n" + "Spotify Preview Link: " + result[0].external_urls.spotify + "\n" + "Album: " + result[0].album.name  + "\n" + "=================================================================");
     });
}
// getSong();
function getMovie() {
     var queryInput = "Mr. Nobody";
     if (argTwo !== undefined) {
          queryInput = argTwo;
     }
     request('http://www.omdbapi.com/?t=' + queryInput + "&tomatoes=true", function (error, response, body) {
          if (!error && response.statusCode == 200) {
               var jsonData = JSON.parse(body);
               console.log("Title: " + jsonData.Title);
               console.log("Year: " + jsonData.Year);
               console.log("IMDB Rating: " + jsonData.imdbRating);
               console.log("Country: " + jsonData.Country);
               console.log("Language: " + jsonData.Language);
               console.log("Plot: " + jsonData.Plot);
               console.log("Actors: " + jsonData.Actors);
               console.log("Rotten Tomatoes Rating: " + jsonData.tomatoUserRating);
               console.log("Rotten Tomatoes URL: " + jsonData.tomatoURL);
               fs.appendFile('log.txt', "Title: " + jsonData.Title + "\n" + "Year: " + jsonData.Year + "\n" + "IMDB Rating: " + jsonData.imdbRating + "\n" + "Country: " + jsonData.Country + "\n" + "Language: " + jsonData.Language + "\n" + "Plot: " + jsonData.Plot + "\n" + "Actors: " + jsonData.Actors + "\n" + "Rotten Tomatoes Rating: " + jsonData.tomatoUserRating + "\n" + "Rotten Tomatoes URL: " + jsonData.tomatoURL + "\n" + "=================================================================");
          }
          else {
               console.log(error);
          }
     });
}
// getMovie();
function getRandom() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    	if(error){
     		console.log(error);
     	}
          else {
               var dataArray = data.split(',');
               var argOne = dataArray[0];
               var argTwo = dataArray[1];
           }
       })
   };
              
   switch(argOne) {
  
    case 'my-tweets':
      getTweets();
      break;
    case 'spotify-this-song':
      getSong();
      break;
    case 'movie-this':
      getMovie();
      break;
    case 'do-what-it-says':
      getRandom();
      break;
    default:
      console.log('LIRI has no idea');
  }
