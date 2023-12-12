import { Modal, Fade, Button, Box, Typography, TextField } from "@mui/material";
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
                `${import.meta.env.VITE_SERVER_URL}/board/${boardId}/task/${taskId}/delete`,
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
                <Typography variant="h5">{description}</Typography>
                <Typography variant="h7">Assignees to: {name}</Typography>
                <br />
                <Typography variant="h7">Details:</Typography>
                <br />
                {comments &&
                comments.map((comment) => (
                    <Typography variant="p" key={comment}>
                    {comment}
                    </Typography>
                ))}
                <br />
                <TextField
                label="comments"
                fullWidth
                // value={newTask.comments}
                onChange={(e) => handleCommentChange("comments", [e.target.value])}
                sx={{ mb: 2 }}
                />
                <br />
                <Button variant="contained" onClick={deleteTask}>
                <DeleteIcon></DeleteIcon>
                </Button>
            </Box>
        </Fade>
    </Modal>
    );
}
