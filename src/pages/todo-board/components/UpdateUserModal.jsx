import { Modal, Fade, Button, Box, Grid, Stack, IconButton, Typography } from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { api } from "../../../api/posts";
import UserCard from "./UserCard";

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateUser = async (user) => {
    const updateUser = async () => {
      try {
        const response = await axios.patch(
          `${api}/board/${boardID}/task/${taskId}/update/user`,
          { user: user._id },
          { headers }
        );
        if (response.data) {
          handleCloseModal();
          const taskToUpdate = tasks.find((task) => task._id === taskId);
          taskToUpdate.user = user;
          setTasks([...tasks]);
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
