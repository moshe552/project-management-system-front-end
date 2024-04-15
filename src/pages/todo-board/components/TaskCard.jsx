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
import UpdateUserModal from "./UpdateUserModal";
import { UseContext } from "../../../context/UseContext";
import { UsersContext } from "../../../context/usersContext";

export default function TaskCard({
  _id,
  name,
  userId,
  description,
  creationDate,
}) {
  const { users } = UseContext(UsersContext);
  const [isDetModalOpen, setDetIsModalOpen] = useState(false);
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const myUser = users.find((u) => u._id === userId);

  const handleOpenDetModal = () => {
    setDetIsModalOpen(true);
  };

  const handleOpenUsersModal = () => {
    setIsUsersModalOpen(true);
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: itemTypes.CARD,
    item: { id: _id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  return isDragging ? (
    <div ref={preview} />
  ) : (
    <Card ref={drag} sx={{ mt: 1, mb: 2, bgcolor: "primary.main" }}>
      <CardHeader
        action={
          <IconButton onClick={handleOpenDetModal}>
            <LaunchIcon sx={{ color: "#D3D3D3" }} />
          </IconButton>
        }
        title={
          <>
            <Typography variant="p" sx={{ color: "#F6C927", fontSize: "2vh" }}>
              {myUser && myUser.firstName + " " + myUser.lastName}
            </Typography>
            <br />
            <Typography
              onClick={handleOpenDetModal}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              component="button"
              variant="p"
              sx={{
                color: isHovered ? "#00BFFF" : "#FFF",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                textAlign: "left",
                textDecoration: isHovered ? "underline" : "none",
              }}
            >
              {name}
            </Typography>
            <br />
            <Typography
              variant="p"
              sx={{ color: "#AFAFAF", fontSize: "1.3vh" }}
            >
              {formatDate(creationDate)}
            </Typography>
          </>
        }
        avatar={
          <IconButton onClick={handleOpenUsersModal}>
            <Avatar
              sx={{ width: 56, height: 56 }}
              src={myUser && myUser.profilePicture}
              alt="Avatar image"
            />
          </IconButton>
        }
      />
      <TaskDetailsModal
        isModalOpen={isDetModalOpen}
        setIsModalOpen={setDetIsModalOpen}
        title={name}
        description={description}
        taskId={_id}
        user={myUser}
      />
      <UpdateUserModal
        isModalOpen={isUsersModalOpen}
        setIsModalOpen={setIsUsersModalOpen}
        taskId={_id}
      />
    </Card>
  );
}
