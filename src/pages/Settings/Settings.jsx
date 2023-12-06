import Grid  from "@mui/material/Grid";
import HeaderTitle from './HeaderTitle'
import HeaderBar from './HeaderBar';
import ListUsers from './ListUsers';

export default function Settings () {

  return (
    <Grid>
    <HeaderBar />

    <HeaderTitle />
    
    <ListUsers />
    </Grid>   
  )
}