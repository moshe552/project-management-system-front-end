import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useState  } from 'react';
import { NavLink , useParams } from "react-router-dom";

export default function HeaderBar() {

  const {boardId} = useParams()
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{color: "#F6C927", background: "#121231" }}>
        <Toolbar variant="dense">

        <NavLink to={`/Projects/todo-board/${boardId}`}>
          <IconButton>
            <ArrowBackIosNewIcon sx={{ color: "#F6C927" }} fontSize="large" />
          </IconButton>
        </NavLink>
      
        </Toolbar>
      </AppBar>
    </Box>
  );
}