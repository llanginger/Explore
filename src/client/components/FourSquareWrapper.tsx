// TODO: Move requests to server, push data from requests to Redux, manipulate THAT data here and then return the results to file that imports THESE functions.

// PROBABLY REDUNDANT - SCOUR FOR USEFUL BITS

import * as axios from "axios"
import * as request from "request"
import * as React from "react"

const testParams = {
	params: {
		near: "Seattle",
		category: "Donuts",
		limit: 10	
	}
}


interface Query {
  near: string, 
  category: string,
  limit: number
}

interface Venue {
  name: string;
  lat: number;
  lng: number;
  id: string;
  photoSrc?: string[];
  reviews?: string[];
}

export class FourSquareWrapper extends React.Component<any, any> {
  
  private unsubscribe: Function;

  constructor(props) {
    super(props)

    this._queryFourSquare = this._queryFourSquare.bind(this)
  }

  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // TODO: add to dispatch payload information about the request parameters 
  _queryFourSquare() {
    this.props.store.dispatch({
      type: "FETCHING_VENUES",
      payload: "Spinner?"
    })
    axios.get("queryFourSquare", testParams)
        .then((response) => {
            console.log("FourSquare response: ", response.data)
            this.props.store.dispatch({
                type: "FETCHED_VENUES",
                payload: {
                    queryInfo: {
                        near: "Seattle",
                        category: "Donuts",
                        limit: 10	
                    },
                    results: response.data
                }
            })
        })
  }

  render() {
    const props = this.props;
    const { store } = props;
    return (
      <div>
        <button onClick={this._queryFourSquare}> DO REQUEST </button>
      </div>
    )
    
  }
}













// export const getFourSquarePhotos = (venueArray: Venue[]) => {
//   for (const venue of venueArray) {
//     const getPhotoUrl = fSets.baseUrl +
//       venue.id + "/photos?" +
//       fSets.clientID +
//       fSets.clientSecret + "&v=20130815"
//       axios.get(getPhotoUrl)
//             .catch((error) => {
//               console.log("Photo call error: ", error)
//             })
//             .then((result) => {
//               const photos = result.response.photos.items;
//               let photoAlbum = []

//               for (const photo of photos) {
//                 photoAlbum.push([photo.prefix + "300x200" + photo.suffix])
//               }

//               if (photoAlbum.length > 0) {
//                 venue.photoSrc = photoAlbum
//               } else {
//                 venue.photoSrc = ["images/noPhoto"]
//               }
//             })
//             .then((venueArray) => {
//               return venueArray;
//             })
//   }
// }

// export const getFourSquareReviews = (venueArray: Venue[]) => {
//   for (const venue of venueArray) {
//     const getReviewUrl = fSets.baseUrl + 
//       venue.id + "/tips?" +
//       fSets.clientID + 
//       fSets.clientSecret;

//       axios.get(getReviewUrl)
//             .catch((error) => {
//               console.log("Review call error: ", error)
//             })
//             .then((result) => {
//               const reviews = result.response.tips.items;
//               let reviewAlbum = [];

//               for (const review of reviews) {
//                 reviewAlbum.push(review.text)
//               }
//               if (reviewAlbum.length > 0) {
//                 venue.reviews = reviewAlbum;
//               } else {
//                 venue.reviews = ["No reviews found!"]
//               }
//             })
//             .then((venueArray) => {
//               return venueArray;
//             })
//   }
// }