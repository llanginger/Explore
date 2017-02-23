"use strict";
var tempOptions = {
    near: "seattle",
    cat: "donuts"
};
var fSets = {
    baseUrl: "https://api.foursquare.com/v2/venues/",
    search: "explore?",
    clientID: "client_id=" + "WGMJMEF5PGBY0Z2VPGOTUV4IZWYTZS5V1E0TPIJHBSHRXNWS",
    clientSecret: "&client_secret=" + "MPIRWAHDMNBZVY2LSAVR1Y0WLQEP5SLDQHIXJZLVFILJHJDQ",
    loc: "near=" + tempOptions.near,
    cat: "&query=" + tempOptions.cat,
    limit: "&limit=5"
};
var fourSqSearch_URL = fSets.baseUrl +
    fSets.search +
    fSets.loc + "&" +
    fSets.clientID +
    fSets.clientSecret + "&v=20130815" +
    fSets.cat +
    fSets.limit;
exports.queryFourSquare = function (query) {
    console.log(query + " " + fourSqSearch_URL);
};
