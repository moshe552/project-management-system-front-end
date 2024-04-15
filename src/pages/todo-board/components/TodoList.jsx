import { Card, Typography, Container, Stack, Box, Grid } from "@mui/material";
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";
import itemTypes from "../../../../utils/itemType";
import AddTaskModal from "./AddTaskModal";
import { useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { UseContext } from "../../../context/UseContext";
import { useParams } from "react-router-dom";
import { ProjectsContext } from "../../../context/projectContext";

export default function TodoList({ status, color, onCardDrop }) {
  const { boardId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { projects } = UseContext(ProjectsContext);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const [{ isOver }, drop] = useDrop({
    accept: itemTypes.CARD,
    drop: (item) => {
      const targetListStatus = status;
      onCardDrop(item.id, targetListStatus);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  const myTasks = projects.find((p) => p._id === boardId).tasks;
  const filteredTasks = myTasks.filter((task) => task.status.name === status);
  return (
    <Container
      ref={drop}
      sx={{
        bgcolor: isOver ? "primary.light" : "secondary.main",
        borderRadius: 2,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <Stack>
        <Card sx={{ bgcolor: "primary.main", mb: 2, mt: 2 }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            p={2}
          >
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <CircleIcon fontSize="small" sx={{ mr: 1, color: color }} />
              <Typography variant="body1" sx={{ color: "#FFF" }}>
                {status}
              </Typography>
            </Grid>
          </Grid>
        </Card>
        {status === "Open" && (
          <Box
            onClick={handleOpenModal}
            style={{ cursor: "pointer", width: "100%" }}
          >
            <Typography variant="body1" sx={{ mt: 1, color: "#36B176" }}>
              Add issue
            </Typography>
          </Box>
        )}
        {filteredTasks &&
          filteredTasks.map((task) => (
            <TaskCard key={task._id} {...task} userId={task.user} />
          ))}
        <AddTaskModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Stack>
    </Container>
  );
}
