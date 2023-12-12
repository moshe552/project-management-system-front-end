import { Grid, IconButton, Typography } from "@mui/material";
import TodoList from "./TodoList";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import TaskFilter from "./TaskFilter";
import axios from "axios";
import { useParams } from "react-router-dom/dist";

const filterData = [
  {
    id: 1,
    title: "Issue Type",
    type: "Task",
  },
  {
    id: 2,
    title: "Category",
    type: "No Category",
  },
  {
    id: 3,
    title: "Milestone",
    type: "No Milestone",
  },
  {
    id: 4,
    title: "Assignee",
    type: "Amir Iqbal",
  },
];

const listsData = [
  {
    id: 1,
    status: "Open",
    // tasks: tasksData,
  },
  {
    id: 2,
    status: "In Progress",
    // tasks: [],
  },
  {
    id: 3,
    status: "Resolved",
    // tasks: [],
  },
  {
    id: 4,
    status: "Closed",
    // tasks: [],
  },
];

export default function TodoBoard() {
  const { boardId } = useParams();
  const [boardData, setBoardData] = useState(null);
  const [tasks, setTasks] = useState([]);

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_ACCESS_TOKEN",
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/board/${boardId}/read`,
        { headers }
      );
      if (response.data) {
        setBoardData(response.data);
        setTasks(response.data.tasks);



        console.log("Tasks:", response.data.tasks);


      }
    } catch (error) {
      console.error("Error could not fetch JSON file", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handelCardDrop = (cardId, targetListStatus) => {

    const dropedCard = tasks.find((task) => task._id === cardId);
    dropedCard.status.name = targetListStatus;
    setTasks([...tasks]);

    const petchData = async () => {
      try {
        await axios.patch(
          `${import.meta.env.VITE_SERVER_URL}/board/${boardId}/task/${cardId}/update/status`,
          { status: targetListStatus },
          { headers }
        );
      } catch (error) {
        console.error("Error could not petch JSON file", error);
      }
    };
    petchData();
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
            Board
            <IconButton>
              <FilterAltOutlinedIcon
                fontSize="large"
                sx={{ color: "#D3D3D3" }}
              />
            </IconButton>
          </Typography>
        </Grid>
      </Grid>
      {filterData.map((filter) => (
        <Grid item key={filter.id} xs={12} sm={6} lg={3}>
          <Grid>
            <Typography variant="p" sx={{ color: "#FFF" }}>
              {filter.title}
            </Typography>
          </Grid>
          <TaskFilter filtering={filter.type} />
        </Grid>
      ))}
      {boardData &&
        listsData.map((list) => (
          <Grid item key={list.id} pb={4} xs={12} sm={6} lg={3}>
            <TodoList
              {...list}
              boardId={boardId}
              setTasks={setTasks}
              tasks={tasks}
              onCardDrop={handelCardDrop}
              fetchData={fetchData}
            />
          </Grid>
        ))}
    </Grid>
  );
}
