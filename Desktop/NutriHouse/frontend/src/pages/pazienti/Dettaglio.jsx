import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getPazienteById } from '../../services/api';

const DettaglioPaziente = () => {
  const { id } = useParams();
  const [paziente, setPaziente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState(null);

  useEffect(() => {
    const fetchPaziente = async () => {
      try {
        const data = await getPazienteById(id);
        setPaziente(data);
      } catch (err) {
        console.error('Errore durante il recupero del paziente:', err);
        setErrore('Impossibile caricare i dati del paziente.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaziente();
  }, [id]);

  if (loading) return <Typography>Caricamento...</Typography>;
  if (errore) return <Typography color="error">{errore}</Typography>;

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h5">Dettaglio Paziente</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/dashboard"
          >
            Home
          </Button>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to={`/pazienti/${id}/diete`}
            >
              Diete
            </Button>
            <Button
              variant="contained"
              color="success"
              component={Link}
              to={`/pazienti/${id}/diete/nuova`}
            >
              Nuova dieta
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to={`/pazienti/${id}/modifica`}
            >
              Modifica
            </Button>
            <Button
              variant="outlined"
              color="error"
              component={Link}
              to={`/pazienti/${id}/delete`}
            >
              Elimina
            </Button>
          </Box>
        </Box>
        <Paper elevation={2} style={{ padding: '1rem', marginTop: '1rem' }}>
          <Typography><strong>Nome:</strong> {paziente.nome}</Typography>
          <Typography><strong>Cognome:</strong> {paziente.cognome}</Typography>
          <Typography><strong>Codice Fiscale:</strong> {paziente.codiceFiscale}</Typography>
          <Typography>
            <strong>Data di Nascita:</strong>{' '}
            {paziente.dataDiNascita
              ? new Date(paziente.dataDiNascita).toLocaleDateString('it-IT')
              : '-'}
          </Typography>
          <Typography><strong>Sesso:</strong> {paziente.sesso}</Typography>
          <Typography><strong>Altezza:</strong> {paziente.altezza} cm</Typography>
          <Typography><strong>Peso:</strong> {paziente.peso} kg</Typography>
          <Typography><strong>Email:</strong> {paziente.email}</Typography>
          <Typography><strong>Telefono:</strong> {paziente.telefono}</Typography>
          <Typography><strong>Note:</strong> {paziente.note}</Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default DettaglioPaziente;