import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import { Project } from "./Project";
import { NavLink, useParams } from "react-router-dom";
import Header from "./header";
import { Grid } from "@mui/material";
import { api } from "../../../api/posts";
import axios from "axios";


const token = localStorage.getItem("authToken");
// console.log("token: " + token)

const { headers } = [
    {
        'Authorization': 'Happy',
        'Content-Type': 'application/json; charset=utf-8',
    }
];

let userID = ''


try {
    const response = await axios.get(`${api}/users/self`,
    {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json; charset=utf-8',
        }
    })
        // console.log(response)
        // console.log('user id:', response.data.result[0]._id);
        userID = response.data.result[0]._id;}
    catch(error) {
        console.error('error: ', error.message);
    };



const UrlDataBoard = `${api}/board/user/${userID}/read`;
console.log(UrlDataBoard)

export default function ListProject() {


    const [projectsList, setProjectsList] = useState([]);


    useEffect(() => {
        fetchProjects();
    }, [])

    const fetchProjects = () => {
        axios.get(UrlDataBoard, { headers })
            .then(response => {
                setProjectsList(response.data)
                // console.log("Mendy", response.data)

            })
            .catch(error => {
                console.error('Error fetching JSON file:', error);
            })
    }

    function handleDeleteItem(id) {
        axios.delete(`${api}/board/${id}/delete`, { headers })
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
