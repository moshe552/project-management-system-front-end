import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { useDrag } from "react-dnd";
import itemTypes from "../../../../utils/itemType";
import TaskDetailsModal from "./TaskDetailsModal";
import { useState } from "react";

export default function TaskCard({
  _id,
  name,
  users,
  description,
  creationDate,
  comments,
  boardId,
  tasks,
  setTasks,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: itemTypes.CARD,
    item: { id: _id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return isDragging ? (
    <div ref={preview} />
  ) : (
    <Card ref={drag} sx={{ mt: 1, mb: 2, bgcolor: "primary.main" }}>
      <CardHeader
        action={
          <IconButton onClick={handleOpenModal}>
            <LaunchIcon sx={{ color: "#D3D3D3" }} />
          </IconButton>
        }
        title={
          <>
            <Typography variant="p" sx={{ color: "#F6C927", fontSize: "2vh" }}>
              { users[0] }
            </Typography>
            <br />
            <Typography variant="p" sx={{ color: "#FFF" }}>
              {name}
            </Typography>
            <br />
            <Typography variant="p" sx={{ color: "#FFF", fontSize: "1.3vh" }}>
              {creationDate}
            </Typography>
          </>
        }
        avatar={
          <IconButton>
            <Avatar src="" alt="Avatar image" />
          </IconButton>
        }
      />
      <TaskDetailsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        comments={comments}
        title={name}
        description={description}
        user={users[0]}
        taskId={_id}
        boardId={boardId}
        tasks={tasks}
        setTasks={setTasks}
      />
    </Card>
  );
}
