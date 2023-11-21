import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";




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
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={props.add}
      >
        <AddCircleSharpIcon />
      </IconButton>
      
    </Grid>
  );
}

export default HeaderUsers;
