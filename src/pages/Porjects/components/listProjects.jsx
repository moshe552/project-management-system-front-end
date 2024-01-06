import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Button, DialogActions, Dialog, DialogTitle, DialogContent, TextField } from "@mui/material";
import { Project } from "./Project";
import { NavLink } from "react-router-dom";
import Header from "./header";
import { Grid } from "@mui/material";
import axios from "axios";
import { UrlDataBoard, headers, api, token , userID} from "../../../api/posts";
import DialogProfect from "./Dialog";
// import { handleDeleteItem } from "../../../api/get";

export default function ListProject() {
    const [projectsList, setProjectsList] = useState([]);
    const [editingProject, setEditingProject] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, [])

    const fetchProjects = () => {
        axios.get(UrlDataBoard, { headers })
            .then(response => {
                setProjectsList(response.data);
            })
            .catch(error => {
                console.error('Error fetching JSON file:', error);
            })
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
                fetchProjects();
            })
            .catch(error => {
                console.error('Error editing project:', error);
            });
    }

    const handleCloseEditDialog = () => {
        setEditingProject(null);
        setEditDialogOpen(false);
    }

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
        >
            <Header title="Projects" />
            <NavLink to={"/Projects/creatProject"}>
                <Button sx={{ color: "#F6C927" }}>
                    <AddIcon />
                </Button>
            </NavLink>
            {projectsList.map((item, index) => (
                <Project
                    NavLink={`/Projects/todo-board/${item._id}`}
                    key={item._id}
                    id={item._id}
                    title={item.name}
                    description={item.description}
                    time={new Date(item.creationDate).toLocaleString()}
                    deleteItem={handleDeleteItem}
                    editItem={() => handleEditItem(item)}
                />
            ))}
    <DialogProfect
                editDialogOpen={editDialogOpen}
            handleCloseEditDialog={handleCloseEditDialog}
            editingProject={editingProject}
            setEditingProject={setEditingProject}
            handleSaveEdit={() => handleSaveEdit(editingProject?._id, editingProject?.name, editingProject?.description)}
            />
        </Grid>
    );
}
