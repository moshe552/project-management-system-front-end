import { Box, Button, Grid, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import TodoList from "./TodoList";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TaskFilter from "./TaskFilter";
import axios from "axios";
import { useParams } from "react-router-dom/dist";
import {api, headers, token} from "../../../api/posts";
import { useProjectsContext } from '../../../context/useProjectContext'
import { useUsersContext } from "../../../context/useUsersContext";


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
  const [boardData, setBoardData] = useState(null);
  const [tasks, setTasks] = useState([]);

  // const token =  { token }
  // const headers = { headers }
  const token = localStorage.getItem("authToken");

  const navigate = useNavigate();
  const { projects, dispatchProjects } = useProjectsContext();
  const { previousState, setPreviousState } = useProjectsContext();
  const { users } = useUsersContext();
  const myProject = projects.find((p) => p._id === boardId)

  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  const fetchData = async (boardId) => {
    const selectedProject = projects.find(p => p._id === boardId);
    if (selectedProject) {
      setBoardData(selectedProject);
      setTasks(selectedProject.tasks);
      
    }};

  useEffect(() => {
    fetchData(boardId);
   
    setPreviousState(projects.find(p => p._id === boardId))
  }, [boardId]);

  const handelCardDrop = (cardId, targetListStatus) => {
    const droppedCard = tasks.find((task) => task._id === cardId);
    droppedCard.status.name = targetListStatus;
    setTasks([...tasks]);
    dispatchProjects({type:'UPDATE_PROJECT', payload: myProject})
    
    const petchData = async () => {
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
    petchData();
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (p) => {
    setAnchorEl(null);
    if (p._id !== boardId) {
      dispatchProjects({type:'UPDATE_PROJECT', payload: previousState})
      navigate(`../Projects/todo-board/${p._id}`)
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
            {boardData ? boardData.name : "Loading..."}
          </Typography>
        </Grid>
        <Grid mr={2}>
          <Typography variant="h6" sx={{ m: 1, color: "#FFF" }}>
            <Button onClick={handleButtonClick} style={{ background: 'none', border: 'none', cursor: 'pointer', color:'#ffffff' }}>
            Board
              <FilterAltOutlinedIcon
                fontSize="large"
                sx={{ color: "#D3D3D3" }}
              />
            </Button>
          </Typography>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {projects && projects.map((p) => (
              <MenuItem key={p._id} onClick={() => handleClose(p)}>{p.name}</MenuItem>
            ))}
        </Menu>
        </Grid>
      </Grid>
      <TaskFilter />
      {boardData &&
        users &&
        tasks &&
        listsData.map((list) => (
          <Grid item key={list.id} pb={4} xs={12} sm={6} lg={3}>
            <TodoList
              {...list}
              boardId={boardId}
              setTasks={setTasks}
              tasks={tasks}
              onCardDrop={handelCardDrop}
              fetchData={fetchData}
              users={users}
            />
          </Grid>
        ))}
    </Grid>
  );
}
