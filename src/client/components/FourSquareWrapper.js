// TODO: Move requests to server, push data from requests to Redux, manipulate THAT data here and then return the results to file that imports THESE functions.
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var axios = require("axios");
var React = require("react");
var testParams = {
    params: {
        near: "Seattle",
        category: "Donuts",
        limit: 10
    }
};
// const fSets = {
//   baseUrl: "https://api.foursquare.com/v2/venues/",
//   search: "explore?",
//   clientID: "client_id=" + "WGMJMEF5PGBY0Z2VPGOTUV4IZWYTZS5V1E0TPIJHBSHRXNWS",
//   clientSecret: "&client_secret=" + "MPIRWAHDMNBZVY2LSAVR1Y0WLQEP5SLDQHIXJZLVFILJHJDQ"
// }
var testRequest = function (query) {
    axios.get("queryFourSquare", query).then(function (response) {
        return response;
    });
};
var FourSquareWrapper = (function (_super) {
    __extends(FourSquareWrapper, _super);
    function FourSquareWrapper(props) {
        _super.call(this, props);
        this._queryFourSquare = this._queryFourSquare.bind(this);
    }
    FourSquareWrapper.prototype.componentDidMount = function () {
        var _this = this;
        var store = this.props.store;
        this.unsubscribe = store.unsubscribe(function () {
            _this.forceUpdate();
        });
    };
    FourSquareWrapper.prototype.componentWillUnmount = function () {
        this.unsubscribe();
    };
    FourSquareWrapper.prototype._queryFourSquare = function (query, store) {
        store.dispatch({
            type: "FETCHING_VENUES",
            payload: "Spinner?"
        });
        axios.get("queryFourSquare", query).then(function (response) {
            store.dispatch({
                type: "FETCHED_VENUES",
                payload: response
            });
            // return response;
        });
    };
    FourSquareWrapper.prototype.render = function () {
        var props = this.props;
        var store = props.store;
        return (<div>
        <button> DO REQUEST </button>
      </div>);
    };
    return FourSquareWrapper;
}(React.Component));
exports.FourSquareWrapper = FourSquareWrapper;
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
