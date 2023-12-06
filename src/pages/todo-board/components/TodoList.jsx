import {
  Card,
  CardHeader,
  Typography,
  Container,
  Stack,
  Button,
} from "@mui/material";
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";
import itemTypes from "../../../../utils/itemType";
import AddTaskModal from "./AddTaskModal";
import { useState } from "react";

export default function TodoList({ boardId, status, onCardDrop, fetchData, setTasks, tasks }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

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

  const filteredTasks = tasks.filter((task) => task.status.name === status);

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
      }}
    >
      <Stack>
        <Card sx={{ bgcolor: "primary.main", mb: 2, mt: 2 }}>
          <CardHeader
            title={
              <Typography variant="p" sx={{ color: "#FFF" }}>
                {status}
              </Typography>
            }
          />
        </Card>
        <Card sx={{ bgcolor: "primary.main", mb: 2 }}>
          <Button onClick={handleOpenModal} fullWidth>
            <Typography variant="p" sx={{ color: "#FFF" }}>
              + Add task
            </Typography>
          </Button>
        </Card>
        {filteredTasks && filteredTasks.map((task) => (
          <TaskCard key={task._id} {...task} />
        ))}
        <AddTaskModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          listStatus={status}
          fetchData={fetchData}
          boardId={boardId}
          setTasks={setTasks}
          tasks={tasks}
        />
      </Stack>
    </Container>
  );
}
