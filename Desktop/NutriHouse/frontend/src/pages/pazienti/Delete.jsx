//pages elimina paziente

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Container, Box, Typography, Button } from "@mui/material";

const PazienteDelete = () => {
    const { id } = useParams();
    const [paziente, setPaziente] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPaziente = async () => {
            try {
                const { data } = await api.get(`/pazienti/${id}`);
                setPaziente(data);
            } catch (err) {
                console.error("Errore durante il recupero del paziente:", err);
            }
        };

        fetchPaziente();
    }, [id]);

    const handleDelete = async () => {
        try {
            await api.delete(`/pazienti/${id}`);
            navigate("/pazienti");
        } catch (err) {
            console.error("Errore durante la cancellazione del paziente:", err);
        }
    };

    if (!paziente) {
        return <Typography>Caricamento...</Typography>;
    }

    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h5">Elimina Paziente</Typography>
                <Typography variant="body1">
                    Sei sicuro di voler eliminare il paziente {paziente.cognome} {paziente.nome}?
                </Typography>
                <Box mt={2}>
                    <Button variant="outlined" onClick={() => navigate("/pazienti")}>
                        Annulla
                    </Button>
                    <Button variant="contained" color="error" onClick={handleDelete}>
                        Elimina
                    </Button>
                </Box>
            </Box>
        </Container>        
    )   

}

export default PazienteDelete