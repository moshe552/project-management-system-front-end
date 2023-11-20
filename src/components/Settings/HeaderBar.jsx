import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';




export default function HeaderBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{color: "#F6C927", background: "#121231" }}>
        <Toolbar variant="dense">
          
          <Typography variant="h6" color="inherit" component="div" >
          {/* If you wont title in page, Enter here!*/}
          </Typography>

        </Toolbar>
      </AppBar>
    </Box>
  );
}