var express = require('express');
var path = require('path');
var app = express();
var request = require("request")
var async = require("async")

app.use(express.static(path.join(__dirname, './build')));

// Listen for requests
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/build/index.html"))
});

var port = process.env.PORT || 3000

app.listen(port, function(){
  console.log('"Go Explore!", running on port: ' + port);
})

// ==================================== //
// ----- FourSquare Query Section ----- //
// ==================================== //

// Url settings object. TODO: Extract this to file and read here with fs
const fSets = {
  baseUrl: "https://api.foursquare.com/v2/venues/",
  search: "explore?",
  clientID: "client_id=" + "WGMJMEF5PGBY0Z2VPGOTUV4IZWYTZS5V1E0TPIJHBSHRXNWS",
  clientSecret: "&client_secret=" + "MPIRWAHDMNBZVY2LSAVR1Y0WLQEP5SLDQHIXJZLVFILJHJDQ"
}

// --- Initialize arrays --- //
let asyncPhotoFunctionArray   = []
let asyncReviewFunctionArray  = []
let InitialFourSquareResults  = []

// --- Initial Venue Request --- //

app.get("/queryFourSquare", (req, res) => {

  // --- Construct get request url based on parameters passed from the client --- //
  let fourSqSearch_URL = fSets.baseUrl +
    fSets.search +
    "near=" + req.query.near + "&" +
    fSets.clientID +
    fSets.clientSecret + "&v=20130815" +
    "&query=" + req.query.category +
    "&limit=" + req.query.limit;

  request(fourSqSearch_URL, (error, response, body) => {
    const venues = JSON.parse(body).response.groups[0].items;
    for (const venue of venues) {
      const v = venue.venue
      // --- Push desired values into initial results array --- //
      InitialFourSquareResults.push ({
        name: v.name,
        lat: v.location.lat,
        lng: v.location.lng,
        id: v.id,
        rating: v.rating ? v.rating : -1
      });
    }
    
    // --- Populate PhotoFunctionArray --- //
    fillAsyncPhotoFunctionArray(InitialFourSquareResults)

    // --- Execute PhotoFunctionArray to retrieve venue photos --- //
    async.parallel(asyncPhotoFunctionArray, (err, result) => {

      // --- Populate ReviewFunctionArray --- //
      fillAsyncReviewFunctionArray(result)
      async.parallel(asyncReviewFunctionArray, (err, result) => {

        // --- Finally, return results to client --- //
        res.send(result)
        resetArrays()
        return;
      })
    })
  })
})

// --- Call createAsyncPhotoFunction for each venue in array --- //
const fillAsyncPhotoFunctionArray = (objArray) => {
  for (const venue of objArray) {
    asyncPhotoFunctionArray.push(createAsyncPhotoFunction(venue))
  }
}

// --- Call createAsyncReviewFunction for each venue in array --- //
const fillAsyncReviewFunctionArray = (objArray) => {
  for (const venue of objArray) {
    asyncReviewFunctionArray.push(createAsyncReviewFunction(venue))
  }
}

// --- Create functions for retrieving venue photo urls --- //
const createAsyncPhotoFunction = (venue) => {
  const getPhotoUrl = fSets.baseUrl +
      venue.id + "/photos?" +
      fSets.clientID +
      fSets.clientSecret + "&v=20130815"
  return (callback) => {
    request(getPhotoUrl, (err, response, body) => {
      const photos = JSON.parse(body).response.photos.items
      let photoAlbum = []

      for (const photo of photos) {
        photoAlbum.push(photo.prefix + "300x200" + photo.suffix)
      }

      if (photoAlbum.length > 0) {
        venue.photoSrc = photoAlbum
      } else {
        venue.photoSrc = ["No image here!"]
      }
      callback(null, venue)
    })
  }
}

// --- Create functions for retrieving venue reviews --- //
const createAsyncReviewFunction = (venue) => {
  const getReviewUrl = fSets.baseUrl +
      venue.id + "/tips?" +
      fSets.clientID +
      fSets.clientSecret + "&v=20130815"
  return (callback) => {
    request(getReviewUrl, (err, response, body) => {
      const reviews = JSON.parse(body).response.tips.items
      let reviewList = []

      for (const review of reviews) {
        reviewList.push(review.text)
      }

      if (reviewList.length > 0) {
        venue.reviews = reviewList
      } else {
        venue.reviews = ["No Reviews!"]
      }
      callback(null, venue)
    })
  }
}

const resetArrays = () => {
  asyncPhotoFunctionArray   = []
  asyncReviewFunctionArray  = []
  InitialFourSquareResults  = []
}


