import * as React from 'react';
import { useState } from "react";
import SettingsData from './SettingsData'

import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import AddIcon from '@mui/icons-material/Add';


import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

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
    <Grid sx={{color: "#F6C927", background: "#121231" }} padding={"20px"} fontSize={"20px"}>

     
     
<IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button sx={{color: "#121231", background: "#F6C927" }} variant="contained" {...bindTrigger(popupState)}>
              <AddIcon />
              </Button>
              <Menu {...bindMenu(popupState)}>

                <MenuItem>
                <input
                  type="text" name="title" placeholder="Enter title" 
                  
                  />
                <Button
                 size="small" variant="contained" endIcon={<SendIcon />}

                 onClick={popupState.close}
                 >
                 
                </Button>
                </MenuItem>



                <MenuItem>
                <input
                  type="text" name="description" placeholder="Enter description" 
                  
                  />
                <Button
                 size="small" variant="contained" endIcon={<SendIcon />}
                 onClick={popupState.close }
                 >
                 
                </Button>
                </MenuItem>
                
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </IconButton>
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}
       onClick={() => { AddU()}}>
        <AddCircleSharpIcon  />
      </IconButton>
      Users 
    </Grid>
  );
}

export default HeaderTitle;
