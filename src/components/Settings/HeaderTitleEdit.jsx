import { useState } from "react";
import MenuSttings from './MenuSttings'


import Grid from "@mui/material/Grid";
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

function HeaderTitleEdit() {
 
  return (
    <Grid bgcolor={'skyblue'} color={"blue"} padding={"20px"} fontSize={"20px"}>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}
       onClick={() => console.log(1)}>
        <SettingsIcon />
      </IconButton>


      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}
       onClick={() => console.log(1)}>
        <MenuSttings />
      </IconButton>


      
      <Typography variant="h4" color="inherit" component="h1" >
            Settings
          </Typography>

          <Typography variant="h6" color="inherit" component="h4" >
            Settings
          </Typography>
          
    </Grid>
  );
}

export default HeaderTitleEdit;
