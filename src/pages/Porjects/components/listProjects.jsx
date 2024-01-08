import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Button, DialogActions, Dialog, DialogTitle, DialogContent, TextField } from "@mui/material";
import { Project } from "./Project";
import { NavLink } from "react-router-dom";
import Header from "./header";
import { Grid } from "@mui/material";
import axios from "axios";
import { useProjectsContext } from '../../../context/useProjectContext'
import { useUsersContext } from '../../../context/useUsersContext'
import { api, token, headers } from "../../../api/posts";

let userID = ''

try {
    const response = await axios.get(`${api}/users/self`, headers )
    userID = response.data.result[0]._id;
}
catch (error) {
    console.error('error: ', error);
};

const UrlDataBoard = `${api}/board/user/${userID}/read`;

export default function ListProject() {
    const { projects, dispatchProjects } = useProjectsContext();
    const { users, dispatchUsers } = useUsersContext();

    const [projectsList, setProjectsList] = useState([]);
    const [editingProject, setEditingProject] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    useEffect(() => {
        fetchProjects();
        fetchUsers();
    }, [])

    const fetchProjects = () => {
        axios.get(UrlDataBoard)
            .then(response => {
                setProjectsList(response.data)
                dispatchProjects({type: 'SET_PROJECTS', payload: response.data})

            })
            .catch(error => {
                console.error('Error fetching JSON file:', error);
            })
    };
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${api}/users/all`,  headers )
            dispatchUsers({type: 'SET_USERS', payload: response.data.result})
            // console.log(users)
        } catch (error) {
            console.error('Error fetching JSON file:', error);
        }
    }

    const handleDeleteItem = (id) => {
        axios.delete(`${api}/board/${id}/delete`)
            .then(() => {
                fetchProjects();
            })
            .catch(error => {
                console.error('Error fetching JSON file:', error);
            })
    }

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
            <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Project</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Project Name"
                        value={editingProject?.name || ""}
                        onChange={(e) => setEditingProject(prev => ({ ...prev, name: e.target.value }))}
                        fullWidth
                    />
                    <TextField
                        label="Description"
                        value={editingProject?.description || ""}
                        onChange={(e) => setEditingProject(prev => ({ ...prev, description: e.target.value }))}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleSaveEdit(editingProject?._id, editingProject?.name, editingProject?.description)} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
