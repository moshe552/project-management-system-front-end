import React from 'react'

import Grid  from "@mui/material/Grid";
import HeaderTitleEdit from './Settings/HeaderTitleEdit'
import HeaderBar from './Settings/HeaderBar';
import ListUsers from './Settings/ListUsers';


export default function Settings () {
  return (
    <Grid>
    <HeaderBar />

    <HeaderTitleEdit />
    
    <ListUsers />
    </Grid>   
  )
}