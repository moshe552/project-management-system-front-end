import {
  Button,
  Grid,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import TodoList from "./TodoList";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TaskFilter from "./TaskFilter";
import axios from "axios";
import { useParams } from "react-router-dom/dist";
import { api, headers } from "../../../api/posts";
import { useProjectsContext } from "../../../context/useProjectContext";

const listsData = [
  {
    id: 1,
    status: "Open",
    color: "#36B176",
  },
  {
    id: 2,
    status: "In Progress",
    color: "#3685B1",
  },
  {
    id: 3,
    status: "Resolved",
    color: "#EE786C",
  },
  {
    id: 4,
    status: "Closed",
    color: "#F6C927",
  },
];

export default function TodoBoard() {
  const { boardId } = useParams();

  const navigate = useNavigate();
  const { projects, dispatchProjects } = useProjectsContext();

  const myProject = projects.find((p) => p._id === boardId);

  const handelCardDrop = (cardId, targetListStatus) => {
    const droppedCard = myProject.tasks.find((task) => task._id === cardId);
    droppedCard.status.name = targetListStatus;
    dispatchProjects({ type: "UPDATE_PROJECT", payload: myProject });
    const updateTaskStatus = async () => {
      try {
        await axios.patch(
          `${api}/board/${boardId}/task/${cardId}/update/status`,
          { status: targetListStatus },
          { headers }
        );
      } catch (error) {
        console.error("Error could not petch JSON file", error);
      }
    };
    updateTaskStatus();
  };

  const [anchorEl, setAnchorEl] = useState(false);

  const handleOpeningProjectsList = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChoosingProject = (project) => {
    setAnchorEl(false);
    if (project._id && project._id !== boardId) {
      navigate(`../Projects/todo-board/${project._id}`);
    }
  };

  return (
    <Grid container height={"100%"} padding={5} spacing={2}>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-start"
        height={"5%"}
        mb={2}
      >
        <NavLink to={`/Projects/todo-board/settings/${boardId}`}>
          <IconButton>
            <SettingsTwoToneIcon sx={{ color: "#D3D3D3" }} fontSize="mid" />
          </IconButton>
        </NavLink>
      </Grid>
      <Grid
        sx={{ bgcolor: "secondary.main", borderRadius: 3, ml: 2 }}
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        height={"10%"}
      >
        <Grid ml={2}>
          <Typography variant="h6" sx={{ m: 2, color: "#FFF" }}>
            {myProject ? myProject.name : "Loading..."}
            {/* <Typography>{" " + myProject.description}</Typography> */}
          </Typography>
        </Grid>
        <Grid mr={2}>
          <Typography sx={{ m: 1, color: "#FFF" }}>
            <Button
              onClick={handleOpeningProjectsList}
              style={{
                color: "#FFF",
              }}
            >
              Projects
              <KeyboardArrowDownIcon
                fontSize="large"
                sx={{ color: "#FFF" }}
              />
            </Button>
          </Typography>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(false)}
          >
            {projects && projects.map((p) => (
              <MenuItem
                sx={{width: 140}}
                key={p._id}
                onClick={() => handleChoosingProject(p)}>
                {p.name}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>
      <TaskFilter />
      {myProject &&
        listsData.map((list) => (
          <Grid item key={list.id} pb={4} xs={12} sm={6} lg={3}>
            <TodoList
              {...list}
              onCardDrop={handelCardDrop}
            />
          </Grid>
        ))}
    </Grid>
  );
}