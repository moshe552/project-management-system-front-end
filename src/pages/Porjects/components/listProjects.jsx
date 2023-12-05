import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import { Project } from "./Project";
import { NavLink } from "react-router-dom";
import Header from "./header";
import { Grid } from "@mui/material";



export default function ListProject() {

    const [projectsList, setProjectsList] = useState([{
        title: "hi",
        description: "hi"
    }, {
        title: "hi",
        description: "hi"
    }]);


    function handleDeleteItem(id) {
        setProjectsList(prevProjectsList => {
            return prevProjectsList.filter((item, index) => index !== id);
        });
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
                <Button sx={{color: "#F6C927"}}>
                    <AddIcon />
                </Button>
            </NavLink>
            {projectsList.map((item, index) => (
                <Project
                    key={item.id}
                    id={index}
                    title={item.title}
                    description={item.description}
                    time={item.time}
                    deleteItem={handleDeleteItem}
                />
            ))}
        </Grid>
    );
}

