import { Dayjs } from 'dayjs';

export interface Address {
  flatNumber: string;
  street: string;
  city: string;
  county: string;
  country: string;
  postcode: string;
}
export interface FormValues {
  personUK: {
    fullName: string;
    address: Address;
    phone: string;
    email: string;
    status: 'employed' | 'self-employed' | 'student' | 'retired' | 'unemployed' | 'other';
    organization: {
      name: string;
      address: Address;
    };
  };
  personOutsideUK: {
    fullName: string;
    pronoun: string;
    relationship: string;
  };
  embassy: {
    name: string;
    address: Address;
  };
  trip: {
    arrivalDate: Dayjs | null;
    departureDate: Dayjs | null;
    reason: string;
    returnReason: string;
    returnCountry: string | null;
    financialSupport: boolean;
    accomodation: boolean;
  };
}
