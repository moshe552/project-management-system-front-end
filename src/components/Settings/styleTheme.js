import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


export const styleTheme = createTheme({
    components: {
        // Name of the component
        Palette :{
            primary : {
                main: 'red!important'
            }
        }
        ,MuiButton: {
          styleOverrides: {
            // Name of the slot
            root: {
              // Some CSS
              fontSize: '1rem!important',
            },
          },
        },
      },
  });