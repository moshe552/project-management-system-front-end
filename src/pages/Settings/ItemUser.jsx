import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";


// Enter image in <Avatar  />  for veiw icon

function ItemUser(props) {
  return (
    <ListItem alignItems="flex-start" sx={{ color: "#FFFFFF" }}>
      <ListItemAvatar>
        <Avatar  /> 
      </ListItemAvatar>
      <ListItemText
        primary={<Typography>{props.firstName} {props.lastName} </Typography>}
        
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="#FFFFFF"
            >
              {props.title}
            </Typography>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="#FFFFFF"
            >
              {" - " + props.email}
            </Typography>
          </React.Fragment>
        }
      />
      {props.FunctionType}
    </ListItem>
  );
}

export default ItemUser;