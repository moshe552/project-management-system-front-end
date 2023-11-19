import { useState } from "react";
import * as React from 'react';


import Grid from "@mui/material/Grid";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';



function HeaderTitleEdit() {

    
    const [titelPage, setTitelPage] = useState('Enter title')
    const [descriptionWrite, setDescriptionWrite] = useState('Enter description')


    const mySend ="send"

    const addTextNow = (event) => {
      const valueName = event.target.name;
      console.log(valueName);
      (valueName == "title") ?
      setTitelPage(event.target.value) :
      setDescriptionWrite(event.target.value);
    }

  


  return (
    <Grid bgcolor={"#21213E"} color={"#F6C927"} padding={"20px"} fontSize={"20px"}>
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
                <SettingsIcon />
              </Button>
              <Menu {...bindMenu(popupState)}>

                <MenuItem>
                <input
                  type="text" name="title" placeholder="Enter title" 
                  onChange={addTextNow}
                  />
                <Button
                 size="small" variant="contained" endIcon={<SendIcon />}

                 onClick={popupState.close}
                 >
                 {mySend}
                </Button>
                </MenuItem>



                <MenuItem>
                <input
                  type="text" name="description" placeholder="Enter description" 
                  onChange={addTextNow}
                  />
                <Button
                 size="small" variant="contained" endIcon={<SendIcon />}
                 onClick={popupState.close }
                 >
                 {mySend}
                </Button>
                </MenuItem>
                
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </IconButton>

      
      <Typography variant="h4" color="inherit" component="h1">
        {titelPage}
      </Typography>

      <Typography variant="h6" color="inherit" component="h4">
       {descriptionWrite}
      </Typography>
    </Grid>
  );
}

export default HeaderTitleEdit;
