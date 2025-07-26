import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Box, Button, Drawer, List, ListItem, ListItemText, Toolbar, CssBaseline } from '@mui/material';
import { Card, CardContent, Grid } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import api from '../../services/api';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { useAuth } from '../../context/useAuth';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Dashboard = () => {
  const { logout } = useAuth();

  const [numPazienti, setNumPazienti] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/pazienti');
        // support array or paginated response
        const list = Array.isArray(data) ? data : (data.content || []);
        setNumPazienti(list.length);
      } catch (err) {
        console.error('Errore caricamento pazienti:', err);
      }
    })();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#263238',
            color: '#ffffff',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {[
              { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
              { text: 'Pazienti', path: '/pazienti', icon: <PeopleIcon /> },
              { text: 'Planner', path: '/planner', icon: <CalendarMonthIcon /> },
              { text: 'info', path: '/info', icon: <LocalDiningIcon /> }
            ].map((item) => (
              <ListItem
                button
                component={Link}
                to={item.path}
                key={item.text}
                sx={{
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#424242',
                  },
                  '&.Mui-selected, &.Mui-selected:hover': {
                    backgroundColor: '#37474f',
                    color: '#fff',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#ffffff' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" gutterBottom>
            Benvenuto su NutriHouse
          </Typography>
          <Button variant="outlined" color="error" onClick={logout}>
            Logout
          </Button>
        </Box>
        <Grid container spacing={2} sx={{ mt: 3, mb: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                  Pazienti
                </Typography>
                <Typography variant="h4">
                  {numPazienti}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* You can add more cards here for Diete, Alimenti, etc. */}
        </Grid>
        <Typography variant="body1">
          Da qui puoi gestire pazienti, diete, planner settimanali e alimenti.
        </Typography>
        <Typography variant="caption" sx={{ mt: 4, color: 'text.secondary' }}>
          Versione 1.0 · sviluppato da <strong>Versione 1.0 · sviluppato da Francesco Chifari – Software Engineer</strong>
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;