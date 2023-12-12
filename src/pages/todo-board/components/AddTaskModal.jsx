import { Modal, Fade, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function AddTaskModal({
  isModalOpen,
  setIsModalOpen,
  listStatus,
  boardId,
  setTasks,
}) {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
  });

  const handleTaskDetailsChange = (field, value) => {
    setNewTask((prevDetails) => ({
        ...prevDetails,
        status: { name: listStatus },
        users: ["Moshe"],
        [field]: value,
      })
    );
  };

  const handleAddTask = async () => {

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
    };
    const addTask = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/board/${boardId}/task/create`,
          newTask,
          { headers }
        );
        if (response.data) {
          setTasks((prevTasks) => [...prevTasks, response.data]);
        }
      } catch (error) {
        console.error("Error could not fetch JSON file", error);
      }
    };

    addTask();

    // Clear the form
    setNewTask({
      name: "",
      description: "",
      status: "",
      users: "",
    });

    // Close the modal after adding the task
    handleCloseModal();
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Fade in={isModalOpen} timeout={500}>
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
          <h2>New Task</h2>
          <TextField
            label="Task Name"
            fullWidth
            value={newTask.name}
            onChange={(e) => handleTaskDetailsChange("name", e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Task Description"
            fullWidth
            multiline
            rows={2}
            value={newTask.description}
            onChange={(e) =>
              handleTaskDetailsChange("description", e.target.value)
            }
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleAddTask}>
            Add Task
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}
