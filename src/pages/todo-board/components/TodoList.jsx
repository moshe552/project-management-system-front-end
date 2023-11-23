import { Card, CardHeader, Typography, Container, Stack } from "@mui/material";
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";
import itemTypes from "../../../../utils/itemType";

export default function TodoList({ id, status, tasks, onCardDrop }) {
  const [{ isOver }, drop] = useDrop({
    accept: itemTypes.CARD,
    drop: (item) => {
      const targetListId = id;
      onCardDrop(item.id, item.listId, targetListId);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  return (
    <Container
      ref={drop}
      sx={{
        bgcolor: isOver ? "primary.light" : "secondary.main",
        borderRadius: 2,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height:"100vh",
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
        {tasks.map((task) => (
          <TaskCard key={task.id} listId={id} {...task} />
        ))}
      </Stack>
    </Container>
  );
}
