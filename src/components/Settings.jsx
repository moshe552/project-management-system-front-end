import React from 'react'

import Grid  from "@mui/material/Grid";
import HeaderTitleEdit from './Settings/HeaderTitleEdit'
import HeaderBar from './Settings/HeaderBar';
import ListUsers from './Settings/ListUsers';
import ModelUsers from './Settings/ModelUsers';


export default function Settings () {
  return (
    <Grid>
    <HeaderBar />

    <HeaderTitleEdit />
    
    <ListUsers />

    <ModelUsers/>
    </Grid>   
  )
}