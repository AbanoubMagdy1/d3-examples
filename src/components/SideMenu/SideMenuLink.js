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
        clsx('navlink', isActive && 'activeLink')
      }
    >
      <ListItem disablePadding className='navlink_item'>
        <ListItemButton>
          <ListItemIcon>
            <Icon className="navlink__icon"/>
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    </NavLink>
  );
}

export default SideMenuLink;