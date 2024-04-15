import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#21213E',
    },
    secondary: {
      main: '#121231',
      light: "#D3D3D3",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#21213E'
    }
  },
});

export default theme;
