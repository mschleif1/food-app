import React from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "./LocationPin";

export default ({ location }) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyAmCOu1arle7vrPygQkZxlOCz2Ya_6pC-o" }}
      defaultCenter={location}
      defaultZoom={15}
    >
      <LocationPin lat={location.lat} lng={location.lng} />
    </GoogleMapReact>
  );
};
