import { Box } from '@mui/material';

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <img src='/loading.svg' width={150} height={150} alt='loading...' />
    </Box>
  );
};

export default Loader;
