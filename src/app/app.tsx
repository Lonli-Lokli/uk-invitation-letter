import styled from 'styled-components';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Grid from '@mui/material/Grid';
import { Banner, ContactFormModal, Disclaimer } from '@uk-letter/banner';
import Container from '@mui/material/Container';
import { FormWizard } from '@uk-letter/form-wizard';

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
            <Disclaimer />
            <ContactFormModal />
          </Grid>
        </Grid>
        <Container 
          maxWidth="lg"
          sx={{ 
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 3, sm: 4 },
            '@media (min-width: 1200px)': {
              maxWidth: '90vw !important',
              px: 6
            }
          }}
        >
          <FormWizard />
        </Container>
      </LocalizationProvider>
    </StyledApp>
  );
}
