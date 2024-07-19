import { createEvent } from 'effector';
import { FormValues } from '../shapes';

export const countries = [
  'United Kingdom',
  'United States',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'India',
  'China',
  'Brazil',
];

export const initialValues: FormValues = {
  personUK: {
    fullName: '',
    address: {
      flatNumber: '',
      street: '',
      city: '',
      county: '',
      country: '',
      postcode: '',
    },
    phone: '',
    email: '',
    employer: {
      name: '',
      address: {
        flatNumber: '',
        street: '',
        city: '',
        county: '',
        country: '',
        postcode: '',
      },
    }
  },
  personOutsideUK: { fullName: '', relationship: '',  pronoun: '' },
  embassy: {
    name: '',
    address: {
      flatNumber: '',
      street: '',
      city: '',
      county: '',
      country: '',
      postcode: '',
    },
  },
  trip: {
    arrivalDate: null,
    departureDate: null,
    reason: '',
    returnReason: '',
    returnCountry: null,
    accomodation: false,
    financialSupport: false
  },
};

// events
export const formSubmitClicked = createEvent<FormValues>();
export const previewButtonClicked = createEvent();

// effects
