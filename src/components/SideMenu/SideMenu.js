import React from 'react';
import { drawerWidth, DrawerHeader } from '../../App.style';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import FaceIcon from '@mui/icons-material/Face';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import GroupsIcon from '@mui/icons-material/Groups';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ChurchIcon from '@mui/icons-material/Church';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import MapIcon from '@mui/icons-material/Map';
import SideMenuLink from './SideMenuLink';



function SideMenu ({ open, handleClose }) {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box'
        }
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List style={{ marginTop: '1rem' }}>
        <SideMenuLink
          path="/face"
          text="Face example"
          Icon={FaceIcon}
          handleClose={handleClose}
        />

        <SideMenuLink
          path="/colors"
          text="Colors Pie"
          Icon={ColorLensIcon}
          handleClose={handleClose}
        />

        <SideMenuLink
          path="/population"
          text="Population of top 5 countries"
          Icon={GroupsIcon}
          handleClose={handleClose}
        />

        <SideMenuLink
          path="/religion"
          text="Religion followers"
          Icon={ChurchIcon}
          handleClose={handleClose}
        />

        <SideMenuLink
          path="/cars"
          text="Cars"
          Icon={DirectionsCarIcon}
          handleClose={handleClose}
        />

        <SideMenuLink
          path="/temperature"
          text="Tempearature"
          Icon={ThermostatIcon}
          handleClose={handleClose}
        />

        <SideMenuLink
          path="/world-map"
          text="World map"
          Icon={MapIcon}
          handleClose={handleClose}
        />
      </List>
    </Drawer>
  );
}

export default SideMenu;