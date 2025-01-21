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
  IconButton,
  Tooltip,
  Alert,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { AddressPanel } from '@uk-letter/address-panel';
import { FormValues } from '../shapes';
import { countries, formSubmitClicked, initialValues } from './model';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { validationSchema } from './validation';

const handleSubmit = (values: FormValues) => {
  formSubmitClicked(values);
};

// First, create a reusable component for panel headers
const PanelHeader = ({
  title,
  tooltip,
}: {
  title: string;
  tooltip: string;
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      mb: 3,
      gap: 1,
    }}
  >
    <Typography
      variant="h5"
      component="h2"
      sx={{
        color: 'primary.main',
        fontSize: { xs: '1.25rem', sm: '1.5rem' },
      }}
    >
      {title}
    </Typography>
    <Tooltip title={tooltip}>
      <IconButton size="small" sx={{ p: 0.5 }}>
        <HelpOutlineIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  </Box>
);

export const FormWizard: React.FC = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form>
          {/* Main container with responsive padding */}
          <Box
            sx={{
              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 3, sm: 4 },
            }}
          >
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {/* UK Resident Panel */}
              <Grid item xs={12} lg={6}>
                <Paper
                  elevation={3}
                  sx={{
                    height: '100%',
                    borderRadius: { xs: 2, sm: 3 },
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden', // Prevents border-radius issues with inner content
                  }}
                >
                  <Box
                    sx={{
                      p: { xs: 2, sm: 3, md: 4 },
                      height: '100%',
                    }}
                  >
                    <PanelHeader
                      title="Person inside UK"
                      tooltip="This is the person who will be hosting and providing the invitation"
                    />

                    {/* Form Fields */}
                    <Grid container spacing={{ xs: 2, sm: 3 }}>
                      {/* Contact Information Section */}
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Field
                              as={TextField}
                              fullWidth
                              required
                              name="personUK.fullName"
                              label="Full Name"
                              size="medium"
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
                              size="medium"
                              InputProps={{
                                startAdornment: (
                                  <Box component="span" sx={{ mr: 1 }}>
                                    +44
                                  </Box>
                                ),
                              }}
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
                              size="medium"
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* Address Section */}
                      <Grid item xs={12}>
                        <AddressPanel
                          prefix="personUK.address."
                          values={values.personUK.address}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          select
                          fullWidth
                          name="personUK.status"
                          label="Your status in the UK"
                          required
                        >
                          <MenuItem value="employed">Employed</MenuItem>
                          <MenuItem value="self-employed">
                            Self-employed
                          </MenuItem>
                          <MenuItem value="student">Student</MenuItem>
                          <MenuItem value="retired">Retired</MenuItem>
                          <MenuItem value="unemployed">Unemployed</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Field>
                      </Grid>

                      {[
                        'employed',
                        'self-employed',
                        'student',
                        'other',
                      ].includes(values.personUK.status) && (
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            fullWidth
                            required
                            name="personUK.organization.name"
                            label={
                              values.personUK.status === 'student'
                                ? 'Institution Name'
                                : 'Organization Name'
                            }
                          />
                          <Box sx={{ mt: 2 }}>
                            <AddressPanel
                              values={values.personUK.organization.address}
                              setFieldValue={setFieldValue}
                              prefix="personUK.organization.address."
                            />
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </Paper>
              </Grid>

              {/* Person outside UK Panel */}
              <Grid item xs={12} lg={6}>
                <Paper
                  elevation={3}
                  sx={{
                    height: '100%',
                    borderRadius: { xs: 2, sm: 3 },
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box
                    sx={{
                      p: { xs: 2, sm: 3, md: 4 },
                      height: '100%',
                    }}
                  >
                    <PanelHeader
                      title="Person outside UK"
                      tooltip="This is the person(s) who will be visiting the UK"
                    />

                    <Grid container spacing={{ xs: 2, sm: 3 }}>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          fullWidth
                          required
                          name="personOutsideUK.fullName"
                          label="Full Name"
                          placeholder="Use comma to separate different people"
                          helperText="For multiple visitors, separate names with commas"
                          sx={{
                            '& .MuiInputBase-input': {
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="personOutsideUK.pronoun"
                          label="Pronoun"
                          placeholder="eg they/them/their or she/her/her"
                          helperText="This helps us generate appropriate letter text"
                          sx={{
                            '& .MuiInputBase-input': {
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          fullWidth
                          required
                          name="personOutsideUK.relationship"
                          label="Relationship"
                          placeholder="e.g. friends"
                          helperText="Your relationship with the visitor(s)"
                          sx={{
                            '& .MuiInputBase-input': {
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>

              {/* Row 2: Panel 3 */}
              <Grid item xs={12}>
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: { xs: 2, sm: 3 },
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                    <PanelHeader
                      title="Embassy Details"
                      tooltip="The embassy where the visitor will apply for their visa"
                    />

                    <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          required
                          name="embassy.name"
                          label="Embassy Name"
                          helperText="Official name of the embassy"
                          sx={{
                            '& .MuiInputBase-input': {
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
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
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: { xs: 2, sm: 3 },
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                    <PanelHeader
                      title="Trip Details"
                      tooltip="Information about the planned visit"
                    />

                    <Grid container spacing={{ xs: 2, sm: 3 }}>
                      <Grid item xs={12} sm={6}>
                        <DatePicker
                          label="Arrival Date"
                          value={values.trip.arrivalDate}
                          onChange={(date: Dayjs | null) =>
                            setFieldValue('trip.arrivalDate', date)
                          }
                          slots={{
                            textField: (params) => (
                              <TextField
                                {...params}
                                fullWidth
                                required
                                sx={{
                                  '& .MuiInputBase-input': {
                                    fontSize: { xs: '0.875rem', sm: '1rem' },
                                  },
                                }}
                              />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <DatePicker
                          label="Departure Date"
                          value={values.trip.departureDate}
                          onChange={(date: Dayjs | null) =>
                            setFieldValue('trip.departureDate', date)
                          }
                          slots={{
                            textField: (params) => (
                              <TextField
                                {...params}
                                fullWidth
                                required
                                sx={{
                                  '& .MuiInputBase-input': {
                                    fontSize: { xs: '0.875rem', sm: '1rem' },
                                  },
                                }}
                              />
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          fullWidth
                          required
                          multiline
                          name="trip.reason"
                          label="Purpose of Visit"
                          helperText="Describe the main reason for the visit"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="trip.returnReason"
                          label="Return Reason"
                          placeholder="eg 'to travel to the USA'"
                          helperText="Why the visitor(s) will return to their home country"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Autocomplete
                          options={countries.map((country) => country.name)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Return Country"
                              helperText="Country the visitor(s) will return to"
                            />
                          )}
                          value={values.trip.returnCountry}
                          onChange={(_, newValue) => {
                            setFieldValue('trip.returnCountry', newValue);
                          }}
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Box
                          sx={{
                            mt: { xs: 2, sm: 3 },
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 2,
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Switch
                                checked={values.trip.accomodation}
                                onChange={(e) =>
                                  setFieldValue(
                                    'trip.accommodation',
                                    e.target.checked
                                  )
                                }
                                name="trip.accommodation"
                              />
                            }
                            label="Host will provide accommodation"
                          />
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
                            label="Host will provide financial support"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>

              {/* Submit Button Section */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: { xs: 2, sm: 3, md: 4 },
                    position: 'sticky',
                    bottom: { xs: 16, sm: 24 },
                    zIndex: 1,
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      minWidth: { xs: '100%', sm: 200 },
                      py: { xs: 1.5, sm: 2 },
                    }}
                  >
                    Generate Letter
                  </Button>
                </Box>
              </Grid>

              {/* Error Messages */}
              <Grid item xs={12}>
                {Object.keys(errors).length > 0 && touched.personUK && (
                  <Alert
                    severity="error"
                    sx={{
                      position: 'fixed',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      zIndex: 2,
                      borderRadius: 0,
                    }}
                  >
                    Please correct the highlighted errors before submitting
                  </Alert>
                )}
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
