import React from 'react'

import Grid  from "@mui/material/Grid";

import HeaderTitleEdit from './Settings/HeaderTitleEdit'
import HeaderBar from './Settings/HeaderBar';
import HeaderTitle from './Settings/HeaderTitle';
import ListUsers from './Settings/ListUsers'







function Settings () {
  return (
    <Grid>
    <HeaderBar />
    <HeaderTitleEdit />
    <HeaderTitle />
    <ListUsers />
    </Grid>
    
  )
}

export default Settings