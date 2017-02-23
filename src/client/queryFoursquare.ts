import * as axios from "axios"
import * as request from "request"

const tempOptions = {
	near: "seattle",
	cat: "donuts"
}

export interface Query {
  near: string, 
  category: string,
  limit: number
}

export interface Venue {
  name: string;
  lat: number;
  lng: number;
  id: string;
  photoSrc?: string[];
  reviews?: string[];
}

const fSets = {
  baseUrl: "https://api.foursquare.com/v2/venues/",
  search: "explore?",
  clientID: "client_id=" + "WGMJMEF5PGBY0Z2VPGOTUV4IZWYTZS5V1E0TPIJHBSHRXNWS",
  clientSecret: "&client_secret=" + "MPIRWAHDMNBZVY2LSAVR1Y0WLQEP5SLDQHIXJZLVFILJHJDQ"
}

export const testRequest = (query) => {
  let fourSqSearch_URL = fSets.baseUrl +
    fSets.search +
    "near=" + query.near + "&" +
    fSets.clientID +
    fSets.clientSecret + "&v=20130815" +
    "&query=" + query.category +
    "&limit=" + query.limit;

    request(fourSqSearch_URL, (error, response, body) => {
      console.log(fourSqSearch_URL)
      console.log(JSON.parse(body).response)
    })
}



export function queryFourSquare(query: Query): Venue[] {

  let fourSqSearch_URL = fSets.baseUrl +
    fSets.search +
    "near=" + query.near + "&" +
    fSets.clientID +
    fSets.clientSecret + "&v=20130815" +
    "&query=" + query.category +
    "&limit=" + query.limit;
  
  let resultsArray = []
  let doneSearching = false
  let photoResultsArray = []

  axios.get(fourSqSearch_URL)
        .catch(function (error) {
          console.log("Initial Foursquare call error: ", error);
        })
        .then((result) => {
          const venues = result.data.response.groups[0].items;
          for (const venue of venues) {
          resultsArray.push ({
              name: venue.venue.name,
              lat: venue.venue.location.lat,
              lng: venue.venue.location.lng,
              id: venue.venue.id
            });
          }
          // return resultsArray
        })
        .then(() => {
          doneSearching = true
        })
  if (doneSearching = false) {
    console.log("Not loaded yet")
  } else {
    return resultsArray
  }
}

export const getFourSquarePhotos = (venueArray: Venue[]) => {
  for (const venue of venueArray) {
    const getPhotoUrl = fSets.baseUrl +
      venue.id + "/photos?" +
      fSets.clientID +
      fSets.clientSecret + "&v=20130815"
      axios.get(getPhotoUrl)
            .catch((error) => {
              console.log("Photo call error: ", error)
            })
            .then((result) => {
              const photos = result.response.photos.items;
              let photoAlbum = []

              for (const photo of photos) {
                photoAlbum.push([photo.prefix + "300x200" + photo.suffix])
              }

              if (photoAlbum.length > 0) {
                venue.photoSrc = photoAlbum
              } else {
                venue.photoSrc = ["images/noPhoto"]
              }
            })
            .then((venueArray) => {
              return venueArray;
            })
  }
}

export const getFourSquareReviews = (venueArray: Venue[]) => {
  for (const venue of venueArray) {
    const getReviewUrl = fSets.baseUrl + 
      venue.id + "/tips?" +
      fSets.clientID + 
      fSets.clientSecret;

      axios.get(getReviewUrl)
            .catch((error) => {
              console.log("Review call error: ", error)
            })
            .then((result) => {
              const reviews = result.response.tips.items;
              let reviewAlbum = [];

              for (const review of reviews) {
                reviewAlbum.push(review.text)
              }
              if (reviewAlbum.length > 0) {
                venue.reviews = reviewAlbum;
              } else {
                venue.reviews = ["No reviews found!"]
              }
            })
            .then((venueArray) => {
              return venueArray;
            })
  }
}