import styled from 'styled-components';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Grid from '@mui/material/Grid';
import { Banner } from '@uk-letter/banner';
import Container from '@mui/material/Container';
import { FormWizard } from '@uk-letter/form-wizard';
import { APIProvider } from '@vis.gl/react-google-maps';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container>
          <Grid item xs={12}>
            <Banner />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <div>
              <FormWizard />
            </div>
          </Container>
        </Grid>
      </LocalizationProvider>
    </StyledApp>
  );
}
