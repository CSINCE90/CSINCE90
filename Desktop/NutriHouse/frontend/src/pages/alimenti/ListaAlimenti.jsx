import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import api from '../../services/api';
import dayjs from 'dayjs';

const ListaAlimenti = () => {
  const { id, dietaId } = useParams();
  const [alimenti, setAlimenti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAlimenti = async () => {
      try {
        const { data } = await api.get(`/diete/${dietaId}/alimenti`);
        setAlimenti(data);
      } catch (e) {
        console.error(e);
        setError('Errore nel caricamento degli alimenti');
      } finally {
        setLoading(false);
      }
    };
    fetchAlimenti();
  }, [dietaId]);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box mt={4} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box mt={4}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box
        mt={4}
        mb={2}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="h5">Alimenti della dieta</Typography>
        <Button
          variant="contained"
          component={Link}
          to={`/pazienti/${id}/diete/${dietaId}/alimenti/nuova`}
        >
          Nuovo alimento
        </Button>
      </Box>

      {alimenti.length === 0 ? (
        <Typography>Nessun alimento presente</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Alimento</TableCell>
              <TableCell>Quantità (g)</TableCell>
              <TableCell>Orario</TableCell>
              <TableCell>Note</TableCell>
              <TableCell align="right">Azioni</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alimenti.map((a) => (
              <TableRow key={a.id}>
                <TableCell>{a.nomeAlimento || a.alimento?.nome}</TableCell>
                <TableCell>{a.quantita ?? '-'}</TableCell>
                <TableCell>
                  {a.orario
                    ? dayjs(a.orario, 'HH:mm').format('HH:mm')
                    : '-'}
                </TableCell>
                <TableCell>{a.note || '-'}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    component={Link}
                    to={`/pazienti/${id}/diete/${dietaId}/alimenti/${a.id}/modifica`}
                  >
                    Modifica
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    component={Link}
                    to={`/pazienti/${id}/diete/${dietaId}/alimenti/${a.id}/elimina`}
                    sx={{ ml: 1 }}
                  >
                    Elimina
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default ListaAlimenti;
