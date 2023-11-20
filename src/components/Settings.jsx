import React from 'react'

import Grid  from "@mui/material/Grid";

import HeaderTitleEdit from './Settings/HeaderTitleEdit'
import HeaderBar from './Settings/HeaderBar';
import HeaderUsers from './Settings/HeaderUsers';
import ListUsers from './Settings/ListUsers'







function Settings () {
  return (
    <Grid>
    <HeaderBar />
    <HeaderTitleEdit />
    <HeaderUsers />
    
    <ListUsers />
    </Grid>
    
  )
}

export default Settings