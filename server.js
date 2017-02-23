var express = require('express');
var path = require('path');
var app = express();
var request = require("request")

app.use(express.static(path.join(__dirname, './build')));

// Listen for requests
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/build/index.html"))
});

var port = process.env.PORT || 3000

app.listen(port, function(){
  console.log("Example app listening on port " + port);
})


// ---------------- FourSquare Query Section ---------------------- //

const fSets = {
  baseUrl: "https://api.foursquare.com/v2/venues/",
  search: "explore?",
  clientID: "client_id=" + "WGMJMEF5PGBY0Z2VPGOTUV4IZWYTZS5V1E0TPIJHBSHRXNWS",
  clientSecret: "&client_secret=" + "MPIRWAHDMNBZVY2LSAVR1Y0WLQEP5SLDQHIXJZLVFILJHJDQ"
}

app.get("/queryFourSquare", function(req, res) {
  console.log("Back end request ok")

  // ------ Log out query params ------ //
  console.log("query: ", req.query)

  let fourSqSearch_URL = fSets.baseUrl +
    fSets.search +
    "near=" + req.query.near + "&" +
    fSets.clientID +
    fSets.clientSecret + "&v=20130815" +
    "&query=" + req.query.category +
    "&limit=" + req.query.limit;

  let resultsArray = []
  let photoResultsArray = []

  request(fourSqSearch_URL, (error, response, body) => {
    console.log(fourSqSearch_URL)
    console.log(JSON.parse(body).response.groups[0].items)

    const venues = JSON.parse(body).response.groups[0].items;
    for (const venue of venues) {
    resultsArray.push ({
        name: venue.venue.name,
        lat: venue.venue.location.lat,
        lng: venue.venue.location.lng,
        id: venue.venue.id
      });
    }
    res.send(resultsArray)
          // return resultsArray
  })
})