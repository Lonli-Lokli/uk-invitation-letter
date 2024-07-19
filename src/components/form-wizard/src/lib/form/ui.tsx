import React from 'react';
import { Formik, Form, Field } from 'formik';
import type {} from '@mui/x-date-pickers/AdapterDayjs';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  Box,
  Autocomplete,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { AddressPanel } from '@uk-letter/address-panel';
import { FormValues } from '../shapes';
import { countries, formSubmitClicked, initialValues } from './model';

const handleSubmit = (values: FormValues) => {
  formSubmitClicked(values);
};

export const FormWizard: React.FC = () => {
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form>
          <Grid container spacing={3}>
            {/* Row 1: Panel 1 and Panel 2 */}
            <Grid item xs={12} lg={6}>
              <Paper elevation={3}>
                <Box p={3}>
                  <Typography variant="h6" gutterBottom>
                    Person inside UK
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        required
                        name="personUK.fullName"
                        label="Full Name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" gutterBottom>
                        Address
                      </Typography>
                      <AddressPanel
                        prefix="personUK.address."
                        values={values.personUK.address}
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        fullWidth
                        required
                        name="personUK.phone"
                        label="Phone"
                        type="tel"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        fullWidth
                        required
                        name="personUK.email"
                        label="Email"
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" gutterBottom>
                        Employer Information
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        required
                        name="personUK.employer.name"
                        label="Employer Name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>
                        Employer Address
                      </Typography>
                      <AddressPanel
                        values={values.personUK.employer.address}
                        setFieldValue={setFieldValue}
                        prefix="personUK.employer.address."
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Paper elevation={3}>
                <Box p={3}>
                  <Typography variant="h6" gutterBottom>
                    Person outside UK
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        required
                        name="personOutsideUK.fullName"
                        placeholder='Use comma to separate different people'
                        label="Full Name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        name="personOutsideUK.pronoun"
                        placeholder='eg they/them/their'
                        label="Pronoun"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        required
                        placeholder='e.g. friends'
                        name="personOutsideUK.relationship"
                        label="Relationship"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>

            {/* Row 2: Panel 3 */}
            <Grid item xs={12}>
              <Paper elevation={3}>
                <Box p={3}>
                  <Typography variant="h6" gutterBottom>
                    Embassy
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        fullWidth
                        required
                        name="embassy.name"
                        label="Name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <AddressPanel
                        prefix="embassy.address."
                        values={values.embassy.address}
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>

            {/* Row 3: Panel 4 */}
            <Grid item xs={12}>
              <Paper elevation={3}>
                <Box p={3}>
                  <Typography variant="h6" gutterBottom>
                    Trip
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        label="Arrival Date"
                        value={values.trip.arrivalDate}
                        onChange={(date: Dayjs | null) =>
                          setFieldValue('trip.arrivalDate', date)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        label="Departure Date"
                        value={values.trip.departureDate}
                        onChange={(date: Dayjs | null) =>
                          setFieldValue('trip.departureDate', date)
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        required
                        name="trip.reason"
                        label="Reason"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        name="trip.returnReason"
                        label="Return Reason"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete
                        options={countries}
                        renderInput={(params) => (
                          <TextField {...params} label="Return Country" />
                        )}
                        value={values.trip.returnCountry}
                        onChange={(_, newValue) => {
                          setFieldValue('trip.returnCountry', newValue);
                        }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={values.trip.accomodation}
                            onChange={(e) =>
                              setFieldValue(
                                'trip.accomodation',
                                e.target.checked
                              )
                            }
                            name="trip.accomodation"
                          />
                        }
                        label="Accomodation"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={values.trip.financialSupport}
                            onChange={(e) =>
                              setFieldValue(
                                'trip.financialSupport',
                                e.target.checked
                              )
                            }
                            name="trip.financialSupport"
                          />
                        }
                        label="Financial Support"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary">
              Generate
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
