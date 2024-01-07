import { Box, Card, TextareaAutosize, Typography } from "@mui/material";
import { useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import { NavLink } from "react-router-dom";
import Header from "../../Porjects/components/header";
import { Project } from "../../Porjects/components/Project";
import axios from "axios";
import { headers, api, token, userID, UrlDataBoard } from "../../../api/posts";
import { Button } from "@mui/material";
import DialogProfect from "../../Porjects/components/Dialog";


const UrlDataCreateBoard = `${api}/board/create`;

export default function CreateProject() {

    const [isSaved, setSaved] = useState(false)

    const fetchProjects = () => {
        axios.get(UrlDataBoard, { headers })
            .then(response => {
                setContect(response.data);
            })
            .catch(error => {
                console.error('Error fetching JSON file:', error);
            })
    }

    const [contect, setContect] = useState({
        "name": "",
        "description": "",
        "users": [],
        "isSprint": false,
        'sprintLength': null
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setContect(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    function handleSaveClick(event) {
        event.preventDefault();

        if (contect.name.trim().length > 0 && contect.description.trim().length > 0) {
            console.log("contect:" , contect)
            axios.post(UrlDataCreateBoard, contect,
                {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json; charset=utf-8',
                    }
                })
                .then(response => {
                    setContect(response.data)
                    console.log("response.data:  ", response.data)
                    setSaved(true)
                    // history.push('/todo-board');
                })
                .catch(error => {
                    console.error('Error creating project:', error);
                });

        } else {
            alert("You need to enter a project name and description");
        }
    }

    const handleDeleteItem = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete the project?');
        if (isConfirmed) {
            axios.delete(`${api}/board/${id}/delete`, { headers })
                .then(() => {
                    fetchProjects();
                })
                .catch(error => {
                    console.error('Error fetching JSON file:', error);
                });
        }
    };

    // ################################################
    // dialog
    const [editingProject, setEditingProject] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const handleEditItem = (project) => {
        setEditingProject(project);
        setEditDialogOpen(true);
    }

    const handleSaveEdit = (id, newName, newDescription) => {
        axios.patch(
            `${api}/board/${id}/update`,
            {
                name: newName,
                description: newDescription
            },
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }
        )
            .then(response => {
                console.log('Edit successful', response.data);
                setEditDialogOpen(false);
                setContect(response.data);
            })
            .catch(error => {
                console.error('Error editing project:', error);
            });
    }

    const handleCloseEditDialog = () => {
        setEditingProject(null);
        setEditDialogOpen(false);
    }
    return (isSaved ?
        <Box>
            <Project
                id={contect._id}
                title={
                    <NavLink
                        to={`/Projects/todo-board/${contect._id}`}
                        style={{ color: "#F6C927", textDecoration: "none" }}
                    >
                        {contect.name}
                    </NavLink>}
                description={contect.description}
                time={contect.creationDate}
                deleteItem={handleDeleteItem}
                editItem={() => handleEditItem(contect)}
            />
            <DialogProfect
                editDialogOpen={editDialogOpen}
                handleCloseEditDialog={handleCloseEditDialog}
                editingProject={editingProject}
                setEditingProject={setEditingProject}
                handleSaveEdit={() => handleSaveEdit(editingProject?._id, editingProject?.name, editingProject?.description)}
            />
        </Box> :
        <form onSubmit={handleSaveClick}>
            <Header title="Add new project" />
            <Card sx={{ m: 3, background: "#121231", color: "#CDCDCD", textAlign: "center" }}>
                <Typography color="#F6C927" >Title</Typography>
                <TextareaAutosize
                    style={{ color: "#CDCDCD", background: "#21213E", width: '200px' }}
                    name="name"
                    value={contect.name}
                    onChange={handleChange}
                />
                <br />
                <br />
                <Typography color="#F6C927">Description</Typography>
                <TextareaAutosize
                    minRows={4}
                    style={{ color: "#CDCDCD", background: "#21213E", width: '200px' }}
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
