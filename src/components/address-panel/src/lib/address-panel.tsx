import React, { useState } from 'react';
import { TextField, Grid, Button, Box } from '@mui/material';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';

interface AddressPanelProps {
  values: {
    flatNumber: string;
    street: string;
    city: string;
    county: string;
    country: string;
    postcode: string;
  };
  prefix: string;
  setFieldValue: (field: string, value: any) => void;
}

const loaderSettings = {
  id: 'google-map-script',
  googleMapsApiKey: 'AIzaSyC7FoZALSfB0Ar5Mk8ziR-uR5hQ78NxVew',
  libraries: ['places' as const],
};
export const AddressPanel: React.FC<AddressPanelProps> = ({
  values,
  setFieldValue,
  prefix,
}) => {
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useJsApiLoader(loaderSettings);

  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      // Parse the address components and set the field values
      // This is a simplified example and might need adjustment based on the actual address format
      const addressComponents = place.address_components;
      if (addressComponents) {
        setFieldValue(`${prefix}street`, place.name || '');
        setFieldValue(
          `${prefix}city`,
          (addressComponents.find((c) => c.types.includes('locality')) ??  addressComponents.find((c) => c.types.includes('postal_town')))
            ?.long_name || ''
        );
        setFieldValue(
          `${prefix}county`,
          addressComponents.find((c) =>
            c.types.includes('administrative_area_level_1')
          )?.long_name || ''
        );
        setFieldValue(
          `${prefix}country`,
          addressComponents.find((c) => c.types.includes('country'))
            ?.long_name || ''
        );
        setFieldValue(
          `${prefix}postcode`,
          addressComponents.find((c) => c.types.includes('postal_code'))
            ?.long_name || ''
        );
      }
    }
  };

  return (
    <Box>
      {!isManualEntry && isLoaded && (
        <Autocomplete

          onLoad={setAutocomplete}
          onPlaceChanged={handlePlaceSelect}
        >
          <TextField fullWidth label="Search address" required/>
        </Autocomplete>
      )}
      <Button onClick={() => setIsManualEntry(!isManualEntry)}>
        {isManualEntry ? 'Use Autocomplete' : 'Enter Manually'}
      </Button>
      {isManualEntry && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Flat Number"
              value={values.flatNumber}
              onChange={(e) =>
                setFieldValue(`${prefix}flatNumber`, e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Street"
              value={values.street}
              onChange={(e) =>
                setFieldValue(`${prefix}street`, e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="City"
              value={values.city}
              onChange={(e) =>
                setFieldValue(`${prefix}city`, e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="County"
              value={values.county}
              onChange={(e) =>
                setFieldValue(`${prefix}county`, e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Country"
              value={values.country}
              onChange={(e) =>
                setFieldValue(`${prefix}country`, e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Postcode"
              value={values.postcode}
              onChange={(e) =>
                setFieldValue(`${prefix}postcode`, e.target.value)
              }
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
