import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export default function HeaderBar() {
  const [nameTitle, setNameTitle] = useState("The page is loading..")
  setTimeout(
    function() {
      setNameTitle("")
    }, 500)
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{color: "#F6C927", background: "#121231" }}>
        <Toolbar variant="dense">
          
          <Typography variant="h6" color="inherit" component="div" >
          {nameTitle}
          </Typography>

        </Toolbar>
      </AppBar>
    </Box>
  );
}