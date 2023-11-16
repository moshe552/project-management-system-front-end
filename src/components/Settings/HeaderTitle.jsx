import { useState } from "react";
import SettingsData from './SettingsData'

import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';

function HeaderTitle() {
  const [users, setUsers] = useState(SettingsData);

  const y = SettingsData[0]

  function AddU() {
    let x = [...users]
    x.splice(x.length,0,y) 
    setUsers(x)
    
    return console.log(users) 
  }

  return (
    <Grid bgcolor={'blueviolet'} color={"gold"} padding={"20px"} fontSize={"20px"}>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}
       onClick={() => { AddU()}}>
        <AddCircleSharpIcon  />
      </IconButton>
      Users 
    </Grid>
  );
}

export default HeaderTitle;
