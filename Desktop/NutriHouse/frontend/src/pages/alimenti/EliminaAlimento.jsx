

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

const EliminaAlimento = () => {
  const { id, dietaId, alimentoId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Carica i dettagli dell'alimento nella dieta per conferma
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/diete/${dietaId}/alimenti/${alimentoId}`);
        setItem(data);
      } catch (e) {
        console.error(e);
        setError('Errore nel caricamento dei dati');
      } finally {
        setLoading(false);
      }
    })();
  }, [dietaId, alimentoId]);

  const handleDelete = async () => {
    try {
      await api.delete(`/diete/${dietaId}/alimenti/${alimentoId}`);
      navigate(`/pazienti/${id}/diete/${dietaId}/alimenti`);
    } catch (e) {
      console.error(e);
      setError('Errore durante l\'eliminazione');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box mt={4} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Elimina Alimento
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Typography sx={{ mb: 2 }}>
          Sei sicuro di voler eliminare l'alimento{' '}
          <strong>{item?.nomeAlimento || item?.alimento?.nome || 'sconosciuto'}</strong>?
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="outlined"
            component={Link}
            to={`/pazienti/${id}/diete/${dietaId}/alimenti`}
          >
            Annulla
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Elimina
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EliminaAlimento;