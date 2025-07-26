import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import api from "../../services/api";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: saveToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await api.post("/auth/login", { email, passw: password });
      if (data.token) {
        saveToken(data.token);
        navigate("/dashboard", { replace: true });
      } else {
        alert("Credenziali non valide");
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
      alert("Errore di rete o del server");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Accedi a NutriHouse
        </Typography>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Box mt={2}>
          <Typography variant="body2">
            Non hai un account? <a href="/register">Registrati</a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;