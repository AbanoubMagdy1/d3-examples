import * as React from 'react';
import { Main, AppBar, DrawerHeader } from './App.style';
import SideMenu from './components/SideMenu/SideMenu';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Routes, Route } from 'react-router-dom';

import FaceRoute from './routes/FaceRoute';
import ColorsRoute from './routes/ColorsRoute';
import PopulationRoute from './routes/PopulationRoute';
import ReligionRoute from './routes/ReligionRoute';
import CarsRoute from './routes/CarsRoute';
import TemperatureRoute from './routes/TemperatureRoute';
import './App.scss';



export default function PersistentDrawerLeft () {
  const [open, setOpen] = React.useState(true);

  function handleDrawerOpen () {
    setOpen(true);
  }

  function handleDrawerClose () {
    setOpen(false);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            D3 examples
          </Typography>
        </Toolbar>
      </AppBar>
      <SideMenu
        open={open}
        handleClose={handleDrawerClose}
      />
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<h3>Please Select an example from the side menu</h3>}/>
          <Route path="/face" element={<FaceRoute/>}/>
          <Route path="/colors" element={<ColorsRoute/>}/>
          <Route path="/population" element={<PopulationRoute/>}/>
          <Route path="/religion" element={<ReligionRoute/>}/>
          <Route path="/cars" element={<CarsRoute/>}/>
          <Route path="/temperature" element={<TemperatureRoute/>}/>
        </Routes>
      </Main>
    </Box>
  );
}