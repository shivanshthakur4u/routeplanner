import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

interface MapProps {
  origin: string;
  destination: string;
  stops: string[];
  onUpdate: () => void;
}

const containerStyle = {
  width: '100%',
  height: '511px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};



const Map: React.FC<MapProps> = ({ origin, destination, stops, onUpdate }) => {
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);

  const OriginBeforeComma = origin.split(',')[0].trim();
  const DestinationBeforeComa = destination.split(',')[0].trim();

  useEffect(() => {
    if (origin && destination) {
      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: OriginBeforeComma,
          destination: DestinationBeforeComa,
          waypoints: stops.filter(stop => stop).map(stop => ({ location: stop, stopover: true })),
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  }, [origin, destination, stops, onUpdate]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY || ''}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
