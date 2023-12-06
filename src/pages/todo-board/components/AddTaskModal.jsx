import { Modal, Fade, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function AddTaskModal({
  isModalOpen,
  setIsModalOpen,
  listStatus,
  boardId,
  setTasks,
  tasks,
}) {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [newTask, setNewTask] = useState({
    _id: uuidv4(),
    name: "",
    description: "",
    creationDate: Date.now(),
    users: ["Moshe"],
    status: "", 
  });

  // Rendering the newTask hook with the new value making the input changes visible
  const handleTaskDetailsChange = (field, value) => {
    setNewTask((prevDetails) => ({
      ...prevDetails,
      status: listStatus,
      [field]: value,
    }));
  };

  const handleAddTask = async () => {
    setTasks(prevTasks => [...prevTasks, newTask]);
    console.log(tasks, newTask);

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
    };
    const addTask = async () => {
      try {
        const response = await axios.post(
          `http://127.0.0.1:3000/board/${boardId}/task/create`,
          newTask,
          { headers }
        );
        if (response.data) {
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error could not fetch JSON file", error);
      }
    };

    addTask();

    // Clear the form
    setNewTask({
      _id: uuidv4(),
      name: "",
      description: "",
      status: "",
      users: "",
    });

    // Close the modal after adding the task
    handleCloseModal();
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      closeAfterTransition
    >
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
            rows={4}
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
