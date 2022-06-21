import React from 'react';
import clsx from 'clsx';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import './SideMenu.scss';


function SideMenuLink ({ path, text, Icon, handleClose }) {
  return (
    <NavLink
      onClick={handleClose}
      to={path}
      className={({ isActive }) =>
        clsx('link', isActive && 'activeLink')
      }
    >
      <ListItem disablePadding className='listItem'>
        <ListItemButton>
          <ListItemIcon>
            <Icon className="listIcon"/>
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    </NavLink>
  );
}

export default SideMenuLink;