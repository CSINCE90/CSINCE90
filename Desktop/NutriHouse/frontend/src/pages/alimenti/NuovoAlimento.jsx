

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import api from '../../services/api';

const NuovoAlimento = () => {
  const { id, dietaId } = useParams();
  const navigate = useNavigate();

  const [alimenti, setAlimenti] = useState([]);
  const [loadingAlimenti, setLoadingAlimenti] = useState(true);
  const [selectedAlimento, setSelectedAlimento] = useState(null);

  const [quantita, setQuantita] = useState('');
  const [orario, setOrario] = useState('');
  const [note, setNote] = useState('');

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/alimenti');
        setAlimenti(data.map(a => ({ id: a.id, label: a.nome })));
      } catch (e) {
        console.error(e);
        setError('Impossibile caricare gli alimenti');
      } finally {
        setLoadingAlimenti(false);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAlimento) {
      setError('Seleziona un alimento');
      return;
    }
    setSubmitting(true);
    try {
      await api.post(`/diete/${dietaId}/alimenti`, {
        idAlimento: selectedAlimento.id,
        quantita: quantita ? Number(quantita) : null,
        orario: orario || null,
        note: note || null,
      });
      navigate(`/pazienti/${id}/diete/${dietaId}/alimenti`);
    } catch (e) {
      console.error(e);
      setError('Errore durante il salvataggio');
      setSubmitting(false);
    }
  };

  if (loadingAlimenti) {
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
          Aggiungi Alimento
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit} noValidate>
          <Autocomplete
            options={alimenti}
            value={selectedAlimento}
            onChange={(_, value) => setSelectedAlimento(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Seleziona alimento"
                margin="normal"
                required
              />
            )}
          />

          <TextField
            fullWidth
            label="Quantità (g)"
            type="number"
            margin="normal"
            inputProps={{ min: 0 }}
            value={quantita}
            onChange={(e) => setQuantita(e.target.value)}
          />

          <TextField
            fullWidth
            label="Orario"
            type="time"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={orario}
            onChange={(e) => setOrario(e.target.value)}
          />

          <TextField
            fullWidth
            label="Note"
            margin="normal"
            multiline
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

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
              type="submit"
              disabled={submitting}
            >
              Salva
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default NuovoAlimento;