import React from 'react'

import Grid  from "@mui/material/Grid";
import HeaderTitle from './Settings/HeaderTitle'
import HeaderBar from './Settings/HeaderBar';
import ListUsers from './Settings/ListUsers';


export default function Settings () {
  return (
    <Grid>
    <HeaderBar />

    <HeaderTitle />
    
    <ListUsers />
    </Grid>   
  )
}