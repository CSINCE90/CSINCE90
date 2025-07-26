

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';

// Schema di validazione Yup
const schema = Yup.object({
  nome: Yup.string().required('Obbligatorio'),
  cognome: Yup.string().required('Obbligatorio'),
  email: Yup.string().email('Email non valida'),
  codiceFiscale: Yup.string()
    .uppercase()
    .length(16, 'Il CF deve avere 16 caratteri')
    .matches(/^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/, 'Formato non valido'),
  telefono: Yup.string(),
  sesso: Yup.string().oneOf(['', 'M', 'F', 'Altro']),
  dataDiNascita: Yup.date(),
  peso: Yup.number().positive('Valore positivo'),
  altezza: Yup.number().positive('Valore positivo'),
  note: Yup.string(),
});

const ModificaPaziente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [success, setSuccess] = useState(false);

  // Formik
  const formik = useFormik({
    initialValues: {
      nome: '',
      cognome: '',
      email: '',
      codiceFiscale: '',
      telefono: '',
      sesso: '',
      dataDiNascita: '',
      peso: '',
      altezza: '',
      note: '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        await api.put(`/pazienti/${id}`, values);
        setSuccess(true);
        setTimeout(() => navigate(`/pazienti/${id}`), 1200);
      } catch (err) {
        console.error(err);
        setErrorMsg('Errore durante l\'aggiornamento');
      }
    },
  });

  // Carica dati esistenti
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/pazienti/${id}`);
        formik.setValues({
          ...data,
          dataDiNascita: data.dataDiNascita || '',
        });
        setLoaded(true);
      } catch (err) {
        console.error(err);
        setErrorMsg('Errore nel caricamento dati');
      }
    };
    fetchData();
  }, [id]);

  if (!loaded) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Caricamento dati paziente…</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Modifica paziente
      </Typography>

      <form onSubmit={formik.handleSubmit} noValidate>
        <Grid container spacing={2}>
          {/* Nome */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nome"
              name="nome"
              value={formik.values.nome}
              onChange={formik.handleChange}
              error={formik.touched.nome && Boolean(formik.errors.nome)}
              helperText={formik.touched.nome && formik.errors.nome}
            />
          </Grid>

          {/* Cognome */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cognome"
              name="cognome"
              value={formik.values.cognome}
              onChange={formik.handleChange}
              error={formik.touched.cognome && Boolean(formik.errors.cognome)}
              helperText={formik.touched.cognome && formik.errors.cognome}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          {/* Codice Fiscale */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Codice Fiscale"
              name="codiceFiscale"
              value={formik.values.codiceFiscale}
              onChange={formik.handleChange}
              error={
                formik.touched.codiceFiscale &&
                Boolean(formik.errors.codiceFiscale)
              }
              helperText={
                formik.touched.codiceFiscale && formik.errors.codiceFiscale
              }
            />
          </Grid>

          {/* Telefono */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Telefono"
              name="telefono"
              value={formik.values.telefono}
              onChange={formik.handleChange}
            />
          </Grid>

          {/* Sesso */}
          <Grid item xs={12} sm={4}>
            <TextField
              select
              fullWidth
              label="Sesso"
              name="sesso"
              value={formik.values.sesso}
              onChange={formik.handleChange}
            >
              <MenuItem value="">-</MenuItem>
              <MenuItem value="M">Maschio</MenuItem>
              <MenuItem value="F">Femmina</MenuItem>
              <MenuItem value="Altro">Altro</MenuItem>
            </TextField>
          </Grid>

          {/* Data di nascita */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Data di nascita"
              name="dataDiNascita"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formik.values.dataDiNascita}
              onChange={formik.handleChange}
            />
          </Grid>

          {/* Peso */}
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Peso (kg)"
              name="peso"
              type="number"
              inputProps={{ min: 0 }}
              value={formik.values.peso}
              onChange={formik.handleChange}
            />
          </Grid>

          {/* Altezza */}
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Altezza (cm)"
              name="altezza"
              type="number"
              inputProps={{ min: 0 }}
              value={formik.values.altezza}
              onChange={formik.handleChange}
            />
          </Grid>

          {/* Note */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Note"
              name="note"
              value={formik.values.note}
              onChange={formik.handleChange}
            />
          </Grid>

          {/* Submit */}
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Salva modifiche
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Snackbar successo */}
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">Aggiornamento riuscito</Alert>
      </Snackbar>

      {/* Snackbar errore */}
      <Snackbar
        open={Boolean(errorMsg)}
        autoHideDuration={4000}
        onClose={() => setErrorMsg(null)}
      >
        <Alert severity="error">{errorMsg}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ModificaPaziente;