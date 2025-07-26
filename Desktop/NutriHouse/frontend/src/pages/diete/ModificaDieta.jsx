

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';

const validationSchema = Yup.object({
  descrizione: Yup.string().required('Descrizione obbligatoria'),
  kcalGiorno: Yup.number()
    .positive('Deve essere un numero positivo')
    .integer('Deve essere un intero')
    .nullable(),
});

const ModificaDieta = () => {
  const { id, dietaId } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      descrizione: '',
      kcalGiorno: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await api.put(`/diete/${dietaId}`, {
          idPaziente: Number(id),
          descrizione: values.descrizione,
          kcalGiorno: values.kcalGiorno ? Number(values.kcalGiorno) : null,
        });
        setFeedback('Dieta aggiornata con successo');
        setTimeout(() => navigate(`/pazienti/${id}`), 1200);
      } catch (e) {
        console.error(e);
        setError('Errore durante l\'aggiornamento della dieta');
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/diete/${dietaId}`);
        formik.setValues({
          descrizione: data.descrizione || '',
          kcalGiorno: data.kcalGiorno != null ? data.kcalGiorno : '',
        });
      } catch (e) {
        console.error(e);
        setError('Errore nel caricamento dei dati');
      }
    })();
  }, [dietaId]);

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Modifica Dieta
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={formik.handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Descrizione"
            name="descrizione"
            margin="normal"
            value={formik.values.descrizione}
            onChange={formik.handleChange}
            error={formik.touched.descrizione && Boolean(formik.errors.descrizione)}
            helperText={formik.touched.descrizione && formik.errors.descrizione}
          />

          <TextField
            fullWidth
            label="Kcal totali"
            name="kcalGiorno"
            type="number"
            margin="normal"
            inputProps={{ min: 0 }}
            value={formik.values.kcalGiorno}
            onChange={formik.handleChange}
            error={formik.touched.kcalGiorno && Boolean(formik.errors.kcalGiorno)}
            helperText={formik.touched.kcalGiorno && formik.errors.kcalGiorno}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button variant="outlined" component={Link} to={`/pazienti/${id}`}>
              Annulla
            </Button>
            <Button variant="contained" type="submit">
              Salva
            </Button>
          </Box>
        </form>

        <Snackbar
          open={!!feedback}
          autoHideDuration={3000}
          onClose={() => setFeedback('')}
        >
          <Alert severity="success">{feedback}</Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default ModificaDieta;