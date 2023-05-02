import React, { useState, useEffect } from 'react';

function GoogleMaps({ address, country, apiKey }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    let geocoder;

    const initMap = () => {
      geocoder = new window.google.maps.Geocoder();

      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });

      geocoder.geocode(
        { address: `${address}, ${country}` },
        (results, status) => {
          if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            new window.google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
            });
          } else {
            console.error(
              'Geocode was not successful for the following reason: ' + status
            );
          }
        }
      );

      setMap(map);
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.defer = true;
      script.async = true;

      script.onload = () => {
        initMap();
      };

      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      if (geocoder) {
        geocoder = null;
      }
    };
  }, [address, country, apiKey]);

  return <div id="map" style={{ height: '500px' }} />;
}

export default GoogleMaps;
