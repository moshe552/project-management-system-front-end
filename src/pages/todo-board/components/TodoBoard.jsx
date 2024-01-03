import { Grid, IconButton, Typography } from "@mui/material";
import TodoList from "./TodoList";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import TaskFilter from "./TaskFilter";
import axios from "axios";
import { api } from "../../../api/posts";

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
  const [tasks, setTasks] = useState(null);
  const [users, setUsers] = useState(null);

  const token = localStorage.getItem("authToken");
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${api}/board/${boardId}/read`, {
        headers,
      });
      if (response.data) {
        setBoardData(response.data);
        getUsers(response.data.tasks);
      }
    } catch (error) {
      console.error("Error could not fetch JSON file", error);
    }
  };

  const getUsers = async (tasks) => {
    try {
      const response = await axios.post(`${api}/users/in`,
        { boardID: boardId },
        { headers }
      );
      if (response.data) {
        setUsers(response.data.result);
        const updatedTasks  = tasks.map((task) => {
          const taskUser = response.data.result.find(user => task.user === user._id)
          task.user = taskUser
          return task
      })
      console.log("updatedTasks :", updatedTasks );


        setTasks(updatedTasks)
      }
    } catch (error) {
      console.error("Error could not fetch JSON file", error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handelCardDrop = (cardId, targetListStatus) => {
    const droppedCard = tasks.find((task) => task._id === cardId);
    droppedCard.status.name = targetListStatus;
    setTasks([...tasks]);

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
