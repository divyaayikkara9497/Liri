//variables
require("dotenv").config();
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var Twitter = require("Twitter");
var client = new Twitter(keys.twitter);
var arguement = process.argv[2];

//making sure the keys.js and .env are connected
//console.log(spotify);
//console.log(client);

function liriArguements() {
	if (arguement === "movie-this"){
		movieSelection();
	}

	else if(arguement === "spotify-this-song") {
		spotifySelection();
	}
	else if(arguement === "my-tweets") {
		twitterSelection();
	}

}

//movies function
function movieSelection() {

	var movieName = "";
	var nodeArgs = process.argv;

	for (var i = 3; i < nodeArgs.length; i++) {
	  if (i > 3 && i < nodeArgs.length) {
	    movieName = movieName + "+" + nodeArgs[i];
	  }
	  else {
	    movieName += nodeArgs[i];
	  }
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&t3896198&apikey=bd30443a";
	//console.log(queryUrl);

	request(queryUrl, function(error, response, body){
		if (!error && response.statusCode === 200) {
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			//console.log("Rotten Tomatoes Rating:" + JSON.parse(body));
			console.log("Country where the movie was produced: " + JSON.parse(body).Country);
			console.log("Language of the Movie: " + JSON.parse(body).Language);
			console.log("Plot of the movie: " + JSON.parse(body).Plot);
			console.log("Actors in the movie: " + JSON.parse(body).Actors);
		}
		
	})
}



//spotify function
function spotifySelection(){
	var songName = "";
	var nodeArgs = process.argv;
	for (var i = 3; i < nodeArgs.length; i++) {
		if (i > 3 && i < nodeArgs.length) {
			songName = songName + "+" + nodeArgs[i];
		}
		else {
			songName += nodeArgs[i];
		}
	}

	spotify.search({type: 'track' , query: songName},function(error, data){
		if (!error) {
			var songInfo = data.tracks.items;
			console.log("Song: " + songInfo[i].name);
		}
		else {
			console.log(error);
		}
})
}

// twitter function NEED TO WORK
function twitterSelection(){
	client.get("statuses/updates", {count: 20}, function(error, tweets, response) {
		if (error) {
			console.log(error);
		}
		else {
			console.log(tweets);
		} 
	})

}


liriArguements();
