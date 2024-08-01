import React, { FC } from 'react';
import { Modal, Box, Typography, TextField, Button, Grid } from '@mui/material';
import { useUnit } from 'effector-react';
import { $isOpen, closeClicked } from './model';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const onCloseClicked = () => closeClicked();
export const ContactFormModal: FC = () => {
  const isOpen = useUnit($isOpen);
  return (
    <Modal
      open={isOpen}
      onClose={onCloseClicked}
      aria-labelledby="contact-form-modal"
      aria-describedby="contact-form-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="contact-form-modal"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Contact me
        </Typography>
        <form
          action="https://formsubmit.co/4aa7fcc39662f7586c67799b921c4889"
          method="POST"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                placeholder="e.g. Bon Jovi"
                name="name"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                placeholder="e.g. bon.jovi@gmail.com"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                placeholder={`e.g. Let's Connect!`}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="button" onClick={onCloseClicked}>Close</Button>
              <Button type="submit" variant="contained" color="primary">
                Send Message
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};
