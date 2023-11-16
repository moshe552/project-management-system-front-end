import React from 'react'

import Grid  from "@mui/material/Grid";

import HeaderTitleEdit from './HeaderTitleEdit'
import HeaderBar from './HeaderBar';
import HeaderTitle from './HeaderTitle';
import Page from './Page';
import ListUsers from './ListUsers'







function Settings () {
  return (
    <Grid>
    <HeaderBar />
    <HeaderTitleEdit />
    <HeaderTitle />
    <Page />
    <ListUsers />
    </Grid>
    
  )
}

export default Settings