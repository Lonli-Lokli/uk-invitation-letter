import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  personUK: Yup.object().shape({
    fullName: Yup.string()
      .required('Full name is required')
      .min(2, 'Name must be at least 2 characters'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^[+\s0-9]+$/, 'Must be a valid phone number'),
    email: Yup.string()
      .required('Email is required')
      .email('Must be a valid email address'),
  }),
}); 