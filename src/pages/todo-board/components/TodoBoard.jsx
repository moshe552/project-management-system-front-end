import {
  Button,
  Grid,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import TodoList from "./TodoList";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TaskFilter from "./TaskFilter";
import axios from "axios";
import { useParams } from "react-router-dom/dist";
import { api, headers } from "../../../api/getUserId";
import { UseContext } from "../../../context/UseContext";
import { ProjectsContext } from "../../../context/projectContext";

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
  const { projects, dispatchProjects } = UseContext(ProjectsContext);

  const myProject = projects && projects.find((p) => p._id === boardId);

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
    <StyledGrid container spacing={2}>
      <SettingsGrid container>
        <NavLink to={`/Projects/todo-board/settings/${boardId}`}>
          <IconButton>
            <SettingsTwoToneIcon sx={settingIconStyle} fontSize="mid" />
          </IconButton>
        </NavLink>
      </SettingsGrid>
      <StyledTopGrid container sx={projectGridStyle}>
        <Grid>
          <Typography variant="h6" sx={projectTextStyle}>
            {myProject ? myProject.name : "Loading..."}
          </Typography>
        </Grid>
        <Grid>
          <Typography>
            <Button onClick={handleOpeningProjectsList} sx={colorWhite}>
              Projects
              <KeyboardArrowDownIcon fontSize="large" sx={colorWhite} />
            </Button>
          </Typography>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(false)}
          >
            {projects &&
              projects.map((p) => (
                <MenuItem
                  sx={menuWidth}
                  key={p._id}
                  onClick={() => handleChoosingProject(p)}
                >
                  {p.name}
                </MenuItem>
              ))}
          </Menu>
        </Grid>
      </StyledTopGrid>
      <TaskFilter />
      {myProject &&
        listsData.map((list) => (
          <Grid item key={list.id} pb={4} xs={12} sm={6} lg={3}>
            <TodoList {...list} onCardDrop={handelCardDrop} />
          </Grid>
        ))}
    </StyledGrid>
  );
}

const settingIconStyle = { color: "#D3D3D3" };
const projectGridStyle = { bgcolor: "secondary.main", borderRadius: 3, ml: 2 };
const projectTextStyle = { m: 2, color: "white" };
const colorWhite = { color: "#FFF" };
const menuWidth = { width: 140 };

const StyledGrid = styled(Grid)(({ theme }) => ({
  height: "100%",
  padding: theme.spacing(5),
}));

const SettingsGrid = styled(Grid)(({ theme }) => ({
  justifyContent: "flex-end",
  marginBottom: theme.spacing(2),
}));

const StyledTopGrid = styled(Grid)(() => ({
  justifyContent: "space-between",
  alignItems: "center",
}));
