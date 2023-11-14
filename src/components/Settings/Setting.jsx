import React from 'react'
import Grid  from "@mui/material/Grid";



import Header from './Header';
import Page from './Page';
import ListUsers from './ListUsers'



function Settings () {
  return (
    <Grid>
    <Header />
    <Page />
    <ListUsers />

    </Grid>
  )
}

export default Settings