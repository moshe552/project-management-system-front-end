import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import { Project } from "./Project";
import { NavLink } from "react-router-dom";
import Header from "./header";
import { Grid } from "@mui/material";
import api from "../../../api/posts";

const UrlDataBoard = 'http://localhost:3000/board/user/3242r42rf/read';

// Define the custom header
const headers = {
    'Authorization': 'Happy',
    'Content-Type': 'application/json; charset=utf-8'
};


export default function ListProject() {

    const [projectsList, setProjectsList] = useState([]);


    useEffect(() =>{
        fetchProjects();
    }, [])

    const fetchProjects = () => {
        api.get(UrlDataBoard, { headers })
            .then(response => {
                setProjectsList(response.data)

            })
            .catch(error => {
                console.error('Error fetching JSON file:', error);
            })
    }

    function handleDeleteItem(id) {
        api.delete(`http://localhost:3000/board/${id}/delete`, {headers})
        .then(() => {
            fetchProjects();
        })
        .catch(error => {
            console.error('Error fetching JSON file:', error);
        })
        // #########################
        // setProjectsList(prevProjectsList => {
        //     return prevProjectsList.filter((item, index) => index !== id);
        // });
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
                    title={item.name}
                    description={item.description}
                    time={item.creationDate}
                    deleteItem={handleDeleteItem}
                />
            ))}
        </Grid>
    );
}

