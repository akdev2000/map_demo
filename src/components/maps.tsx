import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

export default function MapContainer({ myRef }: any, ref: any) {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 12.8996,
    lng: 80.2209,
  });
  const [zoom, setZoom] = useState(15);
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log("Lap ", latitude, longitude);
        setCurrentLocation({
          lat: latitude,
          lng: longitude,
          // zoom: 20
        });
      }
    );
  }, []);

  useEffect(() => {
    console.log("CurrentLocation : ", currentLocation);
  }, [currentLocation]);

  return (
    // Important! Always set the container height explicitly
    // <div style={{ height: "100vh", width: "100%" }} ref={ref} >
    <GoogleMapReact
      bootstrapURLKeys={{ key: "" }}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
      center={currentLocation}
      onGoogleApiLoaded={({ map, maps }) => {
        console.log("maps:  ", map);
        // .;
        maps.event.addListener(map, "bounds_changed", () => {
          console.log("Listener : ", map.getBounds());
        });
      }}
      yesIWantToUseGoogleMapApiInternals
      zoom={zoom}
    >
      <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
    </GoogleMapReact>
    // </div>
  );
}
