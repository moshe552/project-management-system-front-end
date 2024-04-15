import { Modal, Fade, Button, Box, Typography, Grid } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { UseContext } from "../../../context/UseContext";
import { useState } from "react";
import { api, headers } from "../../../api/posts";
import { useParams } from "react-router-dom";
import { ProjectsContext } from "../../../context/projectContext";

export default function TaskDetailsModal({
  isModalOpen,
  setIsModalOpen,
  user,
  title,
  description,
  taskId,
}) {
  const { projects, dispatchProjects } = UseContext(ProjectsContext);
  const { setPreviousState } = UseContext(ProjectsContext);
  const { boardId } = useParams();
  const [isFormModified, setIsFormModified] = useState(false);
  const [deleteButton, setDeleteButton] = useState("");
  const [task, setTask] = useState({
    name: title,
    description: description,
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTaskDetailsChange = (field, value) => {
    setTask((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
    setIsFormModified(true);
  };

  const handleUpdatingTask = async () => {
    const updateTask = async () => {
      try {
        const response = await axios.patch(
          `${api}/board/${boardId}/task/${taskId}/update`,
          task,
          { headers }
        );
        if (response.data) {
          handleCloseModal();
          const updatedProject = projects.find((p) => p._id === boardId);
          updatedProject.tasks = [
            ...updatedProject.tasks.filter((task) => task._id !== taskId),
            response.data,
          ];
          dispatchProjects({ type: "UPDATE_PROJECT", payload: updatedProject });
        }
      } catch (error) {
        console.error("Error could not patch JSON file", error);
      }
    };
    updateTask();
    setIsFormModified(false);
  };

  const handelDeleteTask = () => {
    setDeleteButton("Deleting... ");
    const deleteFromDB = async () => {
      try {
        const response = await axios.delete(
          `${api}/board/${boardId}/task/${taskId}/delete`,
          { headers }
        );
        if (response) {
          handleCloseModal();
          const updatedProject = projects.find((p) => p._id === boardId);
          updatedProject.tasks = [
            ...updatedProject.tasks.filter((task) => task._id !== taskId),
          ];
          dispatchProjects({ type: "UPDATE_PROJECT", payload: updatedProject });
          setPreviousState(updatedProject);
        }
      } catch (error) {
        console.error("Error could not delete task", error);
      }
    };
    deleteFromDB();
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
            justifyContent="flex-end"
            alignItems="flex-start"
          >
            <Button onClick={handleCloseModal}>
              <CloseIcon />
            </Button>
          </Grid>
          <Typography variant="h7">
            Assignees: {user && user.firstName + " " + user.lastName}
          </Typography>
          <br />
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1 } }}
            // noValidate
            autoComplete="off"
          >
            <FormControl variant="standard">
              <InputLabel htmlFor="title">Title:</InputLabel>
              <Input
                id="title"
                value={task.name}
                onChange={(e) =>
                  handleTaskDetailsChange("name", e.target.value)
                }
              />
            </FormControl>
          </Box>
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1 } }}
            autoComplete="off"
          >
            <FormControl variant="standard" fullWidth>
              <InputLabel htmlFor="description">Details:</InputLabel>
              <Input
                id="description"
                multiline
                value={task.description}
                onChange={(e) =>
                  handleTaskDetailsChange("description", e.target.value)
                }
              />
            </FormControl>
          </Box>
          <br />
          <br />
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="flex-end"
          >
            <Button
              variant="contained"
              onClick={handleUpdatingTask}
              disabled={!isFormModified}
            >
              Update Task
            </Button>
            <Button variant="contained" onClick={handelDeleteTask}>
              {deleteButton} <DeleteIcon />
            </Button>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
}
