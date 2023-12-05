import { useParams } from "react-router-dom";

import Grid  from "@mui/material/Grid";
import HeaderTitle from './HeaderTitle'
import HeaderBar from './HeaderBar';
import ListUsers from './ListUsers';

export default function Settings () {

  const {boardId} = useParams()
  
  return (
    <Grid>
    <HeaderBar />

    <HeaderTitle idBoard={boardId} />
    
    <ListUsers />
    </Grid>   
  )
}