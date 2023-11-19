import { Grid, IconButton, Typography } from "@mui/material";
import TodoList from "./TodoList";
import SettingsIcon from "@mui/icons-material/Settings";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function TodoBoard() {
  return (
    <Grid container padding={5} spacing={2}>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-start"
      >
        <IconButton>
          <SettingsIcon fontSize="large" />
        </IconButton>
      </Grid>

      <Grid
        sx={{ bgcolor: "secondary.main", borderRadius: 3, ml: 2 }}
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Grid pt={1} ml={2}>
          <Typography variant="h5" sx={{ m: 2, color: "#FFF" }}>
            Innovasol (INNOVA)
          </Typography>
        </Grid>
        <Grid mr={2}>
          <Typography variant="h5" sx={{ m: 2, color: "#FFF" }}>
            Board
            <IconButton>
              <FilterAltIcon fontSize="large" />
            </IconButton>
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Grid>
          <Typography variant="p" sx={{ color: "#FFF" }}>
            Issue Type
          </Typography>
        </Grid>
        <Grid
          container
          bgcolor={"secondary.main"}
          borderRadius={2}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid m={2}>
            <Typography variant="p" sx={{ color: "#FFF", fontSize: "1.2vh" }}>
              Date
            </Typography>
          </Grid>
          <IconButton>
            <KeyboardArrowDownIcon fontSize="large" sx={{ color: "#FFF" }} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Grid>
          <Typography variant="p" sx={{ color: "#FFF" }}>
            Category
          </Typography>
        </Grid>
        <Grid
          container
          bgcolor={"secondary.main"}
          borderRadius={2}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid m={2}>
            <Typography variant="p" sx={{ color: "#FFF", fontSize: "1.2vh" }}>
              No Category
            </Typography>
          </Grid>
          <IconButton>
            <KeyboardArrowDownIcon fontSize="large" sx={{ color: "#FFF" }} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Grid>
          <Typography variant="p" sx={{ color: "#FFF" }}>
            Milestone
          </Typography>
        </Grid>
        <Grid
          container
          bgcolor={"secondary.main"}
          borderRadius={2}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid m={2}>
            <Typography variant="p" sx={{ color: "#FFF", fontSize: "1.2vh" }}>
              No Milestone
            </Typography>
          </Grid>
          <IconButton>
            <KeyboardArrowDownIcon fontSize="large" sx={{ color: "#FFF" }} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Grid>
          <Typography variant="p" sx={{ color: "#FFF" }}>
            Assignee
          </Typography>
        </Grid>
        <Grid
          container
          bgcolor={"secondary.main"}
          borderRadius={2}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid m={2}>
            <Typography variant="p" sx={{ color: "#FFF", fontSize: "1.2vh" }}>
              Amir Iqbal
            </Typography>
          </Grid>
          <IconButton>
            <KeyboardArrowDownIcon fontSize="large" sx={{ color: "#FFF" }} />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <TodoList />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <TodoList />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <TodoList />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <TodoList />
      </Grid>
    </Grid>
  );
}
