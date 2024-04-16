import { Box, Card, TextareaAutosize, Typography, Button } from "@mui/material";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../../Porjects/components/header";
import { Project } from "../../Porjects/components/Project";
import axios from "axios";
import { token } from "../../../api/getUserId";
import DialogProfect from "../../Porjects/components/Dialog";
import makeApiRequest from "../../../api/apiRequest";
import { UseContext } from "../../../context/UseContext";
import { ProjectsContext } from "../../../context/projectContext";

export default function CreateProject() {
  const { dispatchProjects } = UseContext(ProjectsContext);
  const navigate = useNavigate();
  const [isSaved, setSaved] = useState(false);
  const [contect, setContect] = useState({
    name: "",
    description: "",
    users: [],
    isSprint: false,
    sprintLength: null,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setContect((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  const handleSaveClick = async (event) => {
    event.preventDefault();
    if (
      contect.name.trim().length > 0 &&
      contect.description.trim().length > 0
    ) {
      try {
        const response = await makeApiRequest("board/create", "POST", contect);
				// console.log("POST",response._id);
        setContect(response.data);
        dispatchProjects({ type: "CREATE_PROJECT", payload: response });
        setSaved(true);
        navigate("/projects");
      } catch (error) {
        console.error("Error creating project:", error);
      }
    } else {
      alert("You need to enter a project name and description");
    }
  };

  // ################################################
  // dialog
  const [editingProject, setEditingProject] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditItem = (project) => {
    setEditingProject(project);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = (id, newName, newDescription) => {
    axios
      .patch(
        `${api}/board/${id}/update`,
        {
          name: newName,
          description: newDescription,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )
      .then((response) => {
        console.log("Edit successful", response.data);
        setEditDialogOpen(false);
        setContect(response.data);
      })
      .catch((error) => {
        console.error("Error editing project:", error);
      });
  };

  const handleCloseEditDialog = () => {
    setEditingProject(null);
    setEditDialogOpen(false);
  };
  return isSaved ? (
    <Box>
      <Project
        id={contect._id}
        title={
          <NavLink
            to={`/Projects/todo-board/${contect._id}`}
            style={{ color: "#F6C927", textDecoration: "none" }}
          >
            {contect.name}
          </NavLink>
        }
        description={contect.description}
        time={contect.creationDate}
        editItem={() => handleEditItem(contect)}
      />
      <DialogProfect
        editDialogOpen={editDialogOpen}
        handleCloseEditDialog={handleCloseEditDialog}
        editingProject={editingProject}
        setEditingProject={setEditingProject}
        handleSaveEdit={() =>
          handleSaveEdit(
            editingProject?._id,
            editingProject?.name,
            editingProject?.description
          )
        }
      />
    </Box>
  ) : (
    <form onSubmit={handleSaveClick}>
      <Header title="Add new project" />
      <Card
        sx={{
          m: 3,
          background: "#121231",
          color: "#CDCDCD",
          textAlign: "center",
        }}
      >
        <Typography color="#F6C927">Title</Typography>
        <TextareaAutosize
          style={{ color: "#CDCDCD", background: "#21213E", width: "200px" }}
          name="name"
          value={contect.name}
          onChange={handleChange}
        />
        <br />
        <br />
        <Typography color="#F6C927">Description</Typography>
        <TextareaAutosize
          minRows={4}
          style={{ color: "#CDCDCD", background: "#21213E", width: "200px" }}
          name="description"
          value={contect.description}
          onChange={handleChange}
        />
        <br />

        <Button
          variant="contained"
          endIcon={<SaveIcon />}
          sx={{ m: 3 }}
          type="submit"
        >
          Save
        </Button>
      </Card>
    </form>
  );
}
