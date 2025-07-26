

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import api from '../../services/api';

const DettaglioDieta = () => {
  const { id, dietaId } = useParams();
  const [dieta, setDieta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/diete/${dietaId}`);
        setDieta(data);
      } catch (e) {
        console.error(e);
        setError('Errore nel caricamento dei dettagli della dieta');
      } finally {
        setLoading(false);
      }
    })();
  }, [dietaId]);

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box mt={4} sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Box mt={4}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Dettaglio Dieta
        </Typography>

        <Typography sx={{ mb: 1 }}>
          <strong>Descrizione:</strong> {dieta.descrizione || '-'}
        </Typography>
        <Typography sx={{ mb: 1 }}>
          <strong>Kcal giornaliere:</strong> {dieta.kcalGiorno ?? '-'}
        </Typography>
        <Typography sx={{ mb: 1 }}>
          <strong>Data creazione:</strong>{' '}
          {dieta.dataCreazione
            ? new Date(dieta.dataCreazione).toLocaleDateString('it-IT')
            : '-'}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <strong>Data fine:</strong>{' '}
          {dieta.dataFine
            ? new Date(dieta.dataFine).toLocaleDateString('it-IT')
            : '-'}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="outlined"
            component={Link}
            to={`/pazienti/${id}/diete`}
          >
            Torna alle diete
          </Button>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="success"
              component={Link}
              to={`/pazienti/${id}/diete/${dietaId}/modifica`}
            >
              Modifica
            </Button>
            <Button
              variant="contained"
              color="error"
              component={Link}
              to={`/pazienti/${id}/diete/${dietaId}/elimina`}
            >
              Elimina
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default DettaglioDieta;