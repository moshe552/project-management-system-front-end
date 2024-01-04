import { Modal, Fade, Button, Box, Grid, Stack, IconButton, Typography } from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { api } from "../../../api/posts";
import UserCard from "./UserCard";
import { useProjectsContext } from "../../../context/useProjectContext";

export default function UpdateUserModal({
  isModalOpen,
  setIsModalOpen,
  boardID,
  taskId,
  users,
  headers,
  tasks,
  setTasks
}) {

  const { previousState, setPreviousState } = useProjectsContext();
  // console.log(users)
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateUser = async (user) => {
    // console.log(user)
    const updateUser = async () => {
      try {
        const response = await axios.patch(
          `${api}/board/${boardID}/task/${taskId}/update/user`,
          { user: user._id },
          { headers }
        );
        if (response.data) {
          //  console.log(response.data)
          handleCloseModal();
          const taskToUpdate = tasks.find((task) => task._id === taskId);
          taskToUpdate.user = user;
          setTasks([...tasks]);

          const newProject = previousState
          const updetedTasks = previousState.tasks.map((task) => task._id === response.data._id ? response.data : task);
          newProject.tasks = updetedTasks
          setPreviousState(newProject)
          // console.log(response.data)
        }
      } catch (error) {
        console.error("Error could not patch JSON file", error);
      }
    };
    updateUser();
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
            bgcolor: "secondary.main",
            boxShadow: 24,
            p: 2,
            overflowY: "auto"
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
          >
            <IconButton onClick={handleCloseModal}>
              <CloseIcon sx={{ color: "#D3D3D3" }}/>
            </IconButton>
          </Grid>
          <Grid>
            <Stack>
              {!users ? <Typography variant="p" sx={{color: "#D3D3D3"}}>Loading...</Typography> :
                users.map((user) => (
                <Button
                  key={user._id}
                  onClick={() => handleUpdateUser(user)}
                >
                  <UserCard
                    firstName={user.firstName}
                    lastName={user.lastName}
                    title={user.title}
                    profilePicture={user.profilePicture}
                  />
                </Button>
              ))}
            </Stack>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
}
