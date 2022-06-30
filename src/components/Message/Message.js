import React from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import './Message.scss';
import clsx from 'clsx';

function Message ({ children, variant }) {
  return (
    <Box className={clsx('message-box', variant)}>
      <Typography variant="subtitle1" component="p">
        {children}
      </Typography>
    </Box>
  );
}

Message.defaultProps = {
  variant: 'error'
};

Message.propTypes = {
  variant: PropTypes.oneOf(['error', 'success'])
};

export default Message;