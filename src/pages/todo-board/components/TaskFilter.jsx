import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Grid, Typography } from "@mui/material";

export default function TaskFilter({ filtering }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid bgcolor={"secondary.main"} borderRadius={2}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ width: "100%" }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid>
            <Typography sx={{ color: "#FFF" }}>{filtering}</Typography>
          </Grid>
          <Grid>
            <KeyboardArrowDownIcon sx={{ color: "#FFF" }} />
          </Grid>
        </Grid>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "secondary.main",
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Typography sx={{ color: "#FFF" }}>{filtering}</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography sx={{ color: "#FFF" }}>{filtering}</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography sx={{ color: "#FFF" }}>{filtering}</Typography>
        </MenuItem>
      </Menu>
    </Grid>
  );
}
