import {
  Modal,
  Fade,
  Button,
  Box,
  Grid,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { api, headers } from "../../../api/posts";
import UserCard from "./UserCard";
import { UseContext } from "../../../context/UseContext";
import { useParams } from "react-router-dom";
import { ProjectsContext } from "../../../context/projectContext";
import { UsersContext } from "../../../context/usersContext";

export default function UpdateUserModal({
  isModalOpen,
  setIsModalOpen,
  taskId,
}) {
  const { setPreviousState } = UseContext(ProjectsContext);
  const { projects, dispatchProjects } = UseContext(ProjectsContext);
  const { users } = UseContext(UsersContext);
  const { boardId } = useParams();

  const myProject = projects.find((p) => p._id === boardId);
  const projectUsers = users.filter((u) => myProject.users.includes(u._id));

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateUser = async (user) => {
    const updateUser = async () => {
      try {
        const response = await axios.patch(
          `${api}/board/${boardId}/task/${taskId}/update/user`,
          { user: user._id },
          { headers }
        );
        if (response.data) {
          handleCloseModal();
          const updetedTasks = myProject.tasks.map((task) =>
            task._id === response.data._id ? response.data : task
          );
          myProject.tasks = updetedTasks;
          setPreviousState(myProject);
          dispatchProjects({ type: "UPDATE_PROJECT", payload: myProject });
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
            overflowY: "auto",
            height: "80vh",
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
          >
            <IconButton onClick={handleCloseModal}>
              <CloseIcon sx={{ color: "#D3D3D3" }} />
            </IconButton>
          </Grid>
          <Grid>
            <Stack>
              {!projectUsers ? (
                <Typography variant="p" sx={{ color: "#D3D3D3" }}>
                  Loading...
                </Typography>
              ) : (
                projectUsers.map((user) => (
                  <Button key={user._id} onClick={() => handleUpdateUser(user)}>
                    <UserCard
                      firstName={user.firstName}
                      lastName={user.lastName}
                      title={user.title}
                      profilePicture={user.profilePicture}
                    />
                  </Button>
                ))
              )}
            </Stack>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
}
