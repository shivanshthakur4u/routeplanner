import { useEffect, useState } from 'react';

const useAutocomplete = (input: string) => {
  const [predictions, setPredictions] = useState<any[]>([]);

  useEffect(() => {
    if (input.length > 2) {
      const autocompleteService = new google.maps.places.AutocompleteService();
      autocompleteService.getPlacePredictions({ input }, (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setPredictions(predictions || []);
        } else {
          console.error('Autocomplete error:', status);
          setPredictions([]);
        }
      });
    } else {
      setPredictions([]);
    }
  }, [input]);

  return predictions;
};

export default useAutocomplete;
