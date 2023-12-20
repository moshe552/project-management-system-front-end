import React from 'react'

import Grid  from "@mui/material/Grid";
import HeaderTitle from './pages/Settings/HeaderTitle'
import HeaderBar from './pages/Settings/HeaderBar';
import ListUsers from './pages/Settings/ListUsers';


export default function Settings () {
  return (
    <Grid>
    <HeaderBar />

    <HeaderTitle />
    
    <ListUsers />
    </Grid>   
  )
}