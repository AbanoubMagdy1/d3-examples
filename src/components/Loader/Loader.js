import { CircularProgress } from '@mui/material';

function Loader ({ size, margin }) {
  return (
    <div style={{ textAlign: 'center', margin: `${margin}rem auto` }}>
      <CircularProgress size={size}/>
    </div>
  );
}

Loader.defaultProps = {
  size: 100,
  margin: 1
};

export default Loader;