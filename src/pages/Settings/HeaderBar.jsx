import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';

import { useState  } from 'react';
import { NavLink , useParams } from "react-router-dom";

export default function HeaderBar() {

  const {boardId} = useParams()
  
  const [nameTitle, setNameTitle] = useState("The page is loading..")
  
  setTimeout(
    function() {
      setNameTitle("")
    }, 500)
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{color: "#F6C927", background: "#121231" }}>
        <Toolbar variant="dense">

        <NavLink to={`/Projects/todo-board/${boardId}`}>
          <IconButton>
            <ReplyIcon sx={{ color: "#F6C927" }} fontSize="large" />
          </IconButton>
        </NavLink>
          
          <Typography variant="h6" color="inherit" component="div" >
          {nameTitle}
          </Typography>

        </Toolbar>
      </AppBar>
    </Box>
  );
}