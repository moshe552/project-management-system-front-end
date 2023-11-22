import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import ModelUsers from "./ModelUsers";



function HeaderUsers(props) {
  
  return (
    <Grid
      sx={{ color: "#F6C927", background: "#121231" }}
      padding={"20px"}
      fontSize={"20px"}
    > 
    <Typography> Users </Typography> 
     
      <IconButton
        edge="start"
        color="inherit"
        aria-label="model"
        sx={{ mr: 2 }}
      >
        <ModelUsers listUsers={props.listUsers}/>
      </IconButton>
      
    </Grid>
  );
}

export default HeaderUsers;
