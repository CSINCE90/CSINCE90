import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { register } from '../../services/api';

const Register = () => {
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [passw, setPassw] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleRegister = async () => {
    try {
      const res = await register({ nome, cognome, email, passw, telefono });
      if (res) {
        alert('Registrazione completata');
        window.location.href = '/'; // Redirect al login
      } else {
        alert('Errore nella registrazione');
      }
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      alert('Errore imprevisto');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <Typography variant="h4" gutterBottom>Registrati</Typography>
        <TextField fullWidth label="Nome" margin="normal" onChange={(e) => setNome(e.target.value)} />
        <TextField fullWidth label="Cognome" margin="normal" onChange={(e) => setCognome(e.target.value)} />
        <TextField fullWidth label="Email" margin="normal" onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Password" type="password" margin="normal" onChange={(e) => setPassw(e.target.value)} />
        <TextField fullWidth label="Telefono" margin="normal" onChange={(e) => setTelefono(e.target.value)} />
        <Button variant="contained" fullWidth onClick={handleRegister}>Registrati</Button>
        <Box mt={2}>
          <Typography variant="body2">
            Hai già un account? <a href="/">Accedi</a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;