import React from 'react'
import Grid  from "@mui/material/Grid";
import HeaderTitle from './HeaderTitle'
import HeaderBar from './HeaderBar';
import ListUsers from './ListUsers';
import { useParams } from 'react-router-dom';


export default function Settings () {
  const {boardId} = useParams()
  console.log(boardId);
  return (
    <Grid>
    <HeaderBar />

    <HeaderTitle />
    
    <ListUsers />
    </Grid>   
  )
}