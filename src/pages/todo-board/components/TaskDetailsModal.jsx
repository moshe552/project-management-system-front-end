import { Modal, Fade, Button, Box } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TaskDetailsModal({
  isModalOpen,
  setIsModalOpen,
  name,
  description,
  comments,
  taskId,
  boardId,
  tasks,
  setTasks,
}) {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const deleteTask = () => {
    setTasks(() => [...tasks.filter((task) => task._id !== taskId)]);

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
    };
    const deleteFromDB = async () => {
      try {
        await axios.delete(
          `http://127.0.0.1:3000/board/${boardId}/task/${taskId}/delete`,
          { headers }
        );
        {
          console.log("Someone try to delete me :( !!");
        }
      } catch (error) {
        console.error("Error could not delete task", error);
      }
    };

    deleteFromDB();

    handleCloseModal();
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal} closeAfterTransition>
      <Fade in={isModalOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <h2>{name}</h2>
          <p>{description}</p>
          {comments.map((comment) => (
            <p>{comment}</p>
          ))}
          <Button variant="contained" onClick={deleteTask}>
            <DeleteIcon></DeleteIcon>
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}
