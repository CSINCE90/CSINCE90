

import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Calendario = () => {
  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Calendario alimentare settimanale
        </Typography>
        <Typography variant="body1">
          Qui potrai visualizzare e pianificare i pasti giornalieri per ogni paziente.
        </Typography>
      </Box>
    </Container>
  );
};

export default Calendario;