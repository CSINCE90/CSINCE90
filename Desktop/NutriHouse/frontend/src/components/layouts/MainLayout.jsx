

import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Toolbar,
  CssBaseline,
  Typography,
  Button,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { useAuth } from '../../context/useAuth';

const drawerWidth = 240;

const MainLayout = () => {
  const { logout } = useAuth();

  const menuItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { text: 'Pazienti', path: '/pazienti', icon: <PeopleIcon /> },
    { text: 'Diete', path: '/diete', icon: <RestaurantMenuIcon /> },
    { text: 'Planner', path: '/planner', icon: <CalendarMonthIcon /> },
    { text: 'Alimenti', path: '/alimenti', icon: <LocalDiningIcon /> },
  ];

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
            {menuItems.map((item) => (
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
                }}
              >
                <ListItemIcon sx={{ color: '#ffffff' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button variant="outlined" color="error" onClick={logout}>
              Logout
            </Button>
          </Box>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;