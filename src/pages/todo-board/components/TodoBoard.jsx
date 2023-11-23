import { Grid, IconButton, Typography } from "@mui/material";
import TodoList from "./TodoList";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const tasksData = [
  {
    id: 5,
    name: "Moshe",
    task: "Todo board",
    date: "20/11/23",
  },
  {
    id: 6,
    name: "Netanel",
    task: "Server",
    date: "20/11/23",
  },
  {
    id: 7,
    name: "Yosi",
    task: "Drag and Drap",
    date: "20/11/23",
  },
  {
    id: 8,
    name: "Aviv",
    task: "Settings",
    date: "20/11/23",
  },
];

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

const listData = [
  {
    id: 1,
    status: "Open Project",
    tasks: tasksData,
  },
  {
    id: 2,
    status: "In Progress Project",
    tasks: [],
  },
  {
    id: 3,
    status: "Resolved Project",
    tasks: [],
  },
  {
    id: 4,
    status: "Closed Project",
    tasks: [],
  },
];

export default function TodoBoard() {
  const [taskBoard, setTaskBoard] = useState(listData);

  function handelCardDrop(cardId, sourceListId, targetListId) {
    // Find the source and destination lists
    const sourceList = taskBoard.find((list) => list.id === sourceListId);
    const targetList = taskBoard.find((list) => list.id === targetListId);

    // Find the dropped card in the source list
    const cardIndex = sourceList.tasks.findIndex(
      (card) => card.id === cardId
    );
    const droppedCard = sourceList.tasks[cardIndex];

    // Update the listId of the dropped card
    droppedCard.listId = targetListId;

    // Remove the card from the source list
    sourceList.tasks.splice(cardIndex, 1);

    // Add the card to the destination list
    targetList.tasks.push(droppedCard);

    // Update the state to move the card to the new location
    setTaskBoard([...taskBoard]);
  }
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
        <NavLink to={"/todo-board/settings"}>
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
            Innovasol (INNOVA)
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
          <Grid
            container
            bgcolor={"secondary.main"}
            borderRadius={2}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid m={2}>
              <Typography variant="p" sx={{ color: "#FFF", fontSize: "1.8vh" }}>
                {filter.type}
              </Typography>
            </Grid>
            <IconButton>
              <KeyboardArrowDownIcon fontSize="large" sx={{ color: "#FFF" }} />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      {taskBoard.map((list) => (
        <Grid item key={list.id} pb={4} xs={12} sm={6} lg={3}>
          <TodoList {...list} onCardDrop={handelCardDrop} />
        </Grid>
      ))}
    </Grid>
  );
}
