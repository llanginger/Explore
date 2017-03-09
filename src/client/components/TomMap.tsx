import * as React from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
// ??
import * as InfoBox from "../../../node_modules/react-google-maps/lib/addons/InfoBox"

console.log("Google MAp: ", GoogleMap);
console.log("InfoBox: ", InfoBox);



export class CreateGoogleMap extends React.Component<any, any> {
  renderGoogleMap() {
    const key = "Yosemite Valley";
    const lat = 37.8651;
    const lng = 119.5383; 
    const markers = [{
      position: {
        lat,
        lng,
      },
      key,
      defaultAnimation: 2,
      infoContent: (
          <div>
            <div>
              I am an infoWindow!
            </div>
          </div>
        )
    }];

    const GettingStartedGoogleMap = withGoogleMap(props => (
      <GoogleMap
        ref={props.onMapLoad}
        onClick={props.onMapClick}
        options={{
          zoom: 6,
          center: { lat, lng },
          disableDefaultUI: true
        }}
      >
        {props.markers.map(marker => (
        <Marker
          {...marker}
          onClick={() =>{
            console.log(marker.key);
          }}
          onRightClick={() => props.onMarkerRightClick(marker)}
        >
          <InfoWindow>
            <div>{marker.infoContent}</div>
          </InfoWindow>
        </Marker>
      ))}
      </GoogleMap>
    ));

    return (
        <GettingStartedGoogleMap
          containerElement={
           <div style={{ height: "325px", width: "345px" }} />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={() => {
            console.log("Mapp clicked");
          }}
          markers={markers}
          onMarkerRightClick={this.handleMarkerRightClick}
        />
     );
    }

  render() {
    return (
     <div>
      {this.renderGoogleMap()}
     </div>
    );
  }
}