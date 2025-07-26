import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import api from '../../services/api';

const ListaDiete = () => {
  const [diete, setDiete] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiete = async () => {
      try {
        setLoading(true);
        setErrore(null);
        
        // Recupera il token dal localStorage
        const token = localStorage.getItem('token');
        
        // Configurazione degli headers (anche se il token è null, proviamo la richiesta)
        const config = token ? {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        } : {};

        console.log('Tentativo di fetch diete...');
        
        const { data } = await api.get('/diete', config);
        
        // Gestione della risposta del backend
        const list = Array.isArray(data) ? data : (data?.content || []);
        setDiete(list);
        
      } catch (err) {
        console.error("Errore durante il recupero delle diete:", err);
        
        // Gestione specifica degli errori
        if (err.response?.status === 403) {
          setErrore("Accesso negato. Potresti non avere i permessi necessari o il token potrebbe essere scaduto.");
        } else if (err.response?.status === 401) {
          setErrore("Token scaduto o non valido. Effettua nuovamente il login.");
        } else if (err.response?.status === 404) {
          setErrore("Endpoint non trovato. Verifica la configurazione del server.");
        } else if (err.response?.status >= 500) {
          setErrore("Errore del server. Riprova più tardi.");
        } else if (err.code === 'NETWORK_ERROR' || !err.response) {
          setErrore("Errore di connessione. Verifica che il server sia attivo.");
        } else {
          setErrore(`Errore durante il caricamento delle diete: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDiete();
  }, []);

  // Funzione per ricaricare i dati
  const handleReload = () => {
    setLoading(true);
    setErrore(null);
    // Ricarica i dati
    window.location.reload();
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Elenco Diete
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" component={Link} to="nuova">
            Nuova dieta
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : errore ? (
          <Box sx={{ mt: 2 }}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {errore}
            </Alert>
            <Button variant="outlined" onClick={handleReload}>
              Riprova
            </Button>
          </Box>
        ) : (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome Paziente</TableCell>
                  <TableCell>Data Creazione</TableCell>
                  <TableCell align="right">Azioni</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(diete) && diete.length > 0 ? (
                  diete.map((dieta) => (
                    <TableRow key={dieta.id}>
                      <TableCell>{dieta.id}</TableCell>
                      <TableCell>{dieta.nomePaziente || 'N/A'}</TableCell>
                      <TableCell>
                        {dieta.dataCreazione 
                          ? dayjs(dieta.dataCreazione).format('DD/MM/YYYY') 
                          : 'N/A'
                        }
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => navigate(`/diete/${dieta.id}`)}
                        >
                          Dettagli
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography variant="body2" color="textSecondary">
                        Nessuna dieta trovata
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default ListaDiete;