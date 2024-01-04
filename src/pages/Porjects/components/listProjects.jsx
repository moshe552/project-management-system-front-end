import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import { Project } from "./Project";
import { NavLink, useParams } from "react-router-dom";
import Header from "./header";
import { Grid } from "@mui/material";
import { api } from "../../../api/posts";
import axios from "axios";
import { useProjectsContext } from '../../../context/useProjectContext'
import { useUsersContext } from '../../../context/useUsersContext'


const token = localStorage.getItem("authToken");

let userID = ''

const headers = {
        headers: {
        'Authorization': token,
        'Content-Type': 'application/json; charset=utf-8',
    }   
}

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

        } catch (error) {
            console.error('Error fetching JSON file:', error);
        }
    }

    function handleDeleteItem(id) {
        axios.delete(`${api}/board/${id}/delete`)
            .then(() => {
                fetchProjects();
            })
            .catch(error => {
                console.error('Error fetching JSON file:', error);
            })
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
                    key={item._id}
                    id={item._id}
                    title={
                        <NavLink
                            to={`/Projects/todo-board/${item._id}`}
                            style={{ color: "#F6C927", textDecoration: "none" }}
                        > {item.name} </NavLink>}
                    description={item.description}
                    time={item.creationDate}
                    deleteItem={handleDeleteItem}
                />
            ))}
        </Grid>
    );
}
