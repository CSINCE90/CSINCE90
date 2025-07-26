import { Box, Typography, Link } from "@mui/material";

const Info = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>
      Informazioni
    </Typography>

    <Typography variant="body1" paragraph>
      <strong>NutriHouse – Gestionale per Nutrizionisti</strong>
      <br />
      Versione 1.0
    </Typography>

    <Typography variant="body2" paragraph>
      Sviluppato da <strong>Francesco Chifari</strong>, Software Engineer
      (Laurea in Scienze Informatiche).
    </Typography>

    <Typography variant="caption" color="text.secondary">
© 2025 – Questo progetto è open source. Il codice sorgente è
      disponibile su{" "}
      <Link
        href="https://github.com/CSINCE90/nutrihouse"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </Link>
      .
    </Typography>
  </Box>
);

export default Info;