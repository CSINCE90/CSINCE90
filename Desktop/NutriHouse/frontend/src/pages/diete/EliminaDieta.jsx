

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import api from '../../services/api';

const EliminaDieta = () => {
  const { id, dietaId } = useParams();
  const navigate = useNavigate();
  const [dieta, setDieta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch dieta details for confirmation
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/diete/${dietaId}`);
        setDieta(data);
      } catch (e) {
        console.error(e);
        setError('Errore nel caricamento dei dati della dieta');
      } finally {
        setLoading(false);
      }
    })();
  }, [dietaId]);

  const handleDelete = async () => {
    try {
      await api.delete(`/diete/${dietaId}`);
      navigate(`/pazienti/${id}`);
    } catch (e) {
      console.error(e);
      setError('Errore durante l\'eliminazione della dieta');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box mt={4} sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Elimina Dieta
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Typography sx={{ mb: 2 }}>
          Sei sicuro di voler eliminare la dieta{' '}
          <strong>{dieta?.descrizione || 'sconosciuta'}</strong>?
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="outlined" component={Link} to={`/pazienti/${id}`}>
            Annulla
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Elimina
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EliminaDieta;