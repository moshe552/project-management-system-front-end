import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// Enter image in <Avatar  />  for veiw icon

function ItemUser(props) {
  return (
    <ListItem alignItems="flex-start" sx={{ color: "#FFFFFF" }}>
      <ListItemAvatar>
        <Avatar  /> 
      </ListItemAvatar>
      <ListItemText
        primary={props.name}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="#FFFFFF"
            >
              {props.age}
            </Typography>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="#FFFFFF"
            >
              {" " + props.text}
            </Typography>
          </React.Fragment>

        }
      />
      <DeleteOutlineIcon onClick={props.deleteUser}/>
    </ListItem>
  );
}

export default ItemUser;
