import {
  Modal,
  Fade,
  TextField,
  Button,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import {api} from "../../../api/posts";

export default function AddTaskModal({
  isModalOpen,
  setIsModalOpen,
  boardId,
  setTasks,
}) {
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [addTaskButton, setAddTaskButton] = useState("ADD TASK")

  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    user: '',
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDescriptionError(false);
    setNameError(false);
    setNewTask({
      name: '',
      description: '',
    });
  };

  const handleTaskDetailsChange = (field, value) => {
    setNewTask((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
    if (field === "name") {
      setNameError(false);
    }
    if (field === "description") {
      setDescriptionError(false)
    }
  };

  const handleAddTask = async () => {
    if (!newTask.name || !newTask.description) {
      setNameError(!newTask.name);
      setDescriptionError(!newTask.description);
      return;
    }
    setAddTaskButton("ADDING TASK...")
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
    };
    const addTask = async () => {
      try {
        const response = await axios.post(
          `${api}/board/${boardId}/task/create`,
          newTask,
          { headers }
        );
        if (response.data) {
          handleCloseModal();
          setAddTaskButton("ADD TASK")
          setTasks((prevTasks) => [...prevTasks, response.data]);
        }
      } catch (error) {
        console.error("Error could not fetch JSON file", error);
      }
    };
    addTask();
    
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
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={3}
          >
            <Typography variant="h5">New Task</Typography>
            <Button onClick={handleCloseModal}>
              <CloseIcon />
            </Button>
          </Grid>

          <TextField
            required
            label="Task Name"
            fullWidth
            value={newTask.name}
            onChange={(e) => handleTaskDetailsChange("name", e.target.value)}
            sx={{ mb: 4 }}
            error={nameError}
            helperText={nameError ? "Task Name is required" : ""}
            autoComplete="off"
          />
          <TextField
            required
            label="Task Description"
            fullWidth
            multiline
            rows={2}
            value={newTask.description}
            onChange={(e) =>
              handleTaskDetailsChange("description", e.target.value)
            }
            error={descriptionError}
            helperText={descriptionError ? "Description is required" : ""}
            sx={{ mb: 3 }}
          />
          <Button variant="contained" onClick={handleAddTask}>
            {addTaskButton}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}
