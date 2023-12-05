import { Card, Typography } from "@mui/material";
import { useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import Header from "../../Porjects/components/header";
import Input from '@mui/material/Input';






export default function CreateProject() {

    var [contect, setContect] = useState({
        title: "",
        description: ""
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setContect(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }
    var [newContect, setNewContect] = useState({
        ...contect,
        title: "Title",
    });
    function handleSaveClick(event) {
        if (contect.title.trim().length > 0 && contect.description.trim().length > 0) {
            setNewContect(prevContect => ({ ...prevContect, ...contect }));
            setContect({
                title: "",
                description: ""
            });
        } else {
            alert("You need to enter a project name and description");

        }

        event.preventDefault();
    }


    return (


        <form onSubmit={handleSaveClick}>
            <Header title="Add new project" />
            <Card sx={{ m: 3, background: "#121231", color: "#CDCDCD",textAlign: "center" }}>
                <Typography
                    color="#F6C927"
                    variant="h6"
                >
                    {newContect.title}
                </Typography>
                <Input
                    sx={{ color: "#CDCDCD", background: "#21213E"}}
                    defaultValue="Hello world"
                    name="title"
                    value={contect.title}
                    onChange={handleChange}
                />
            </Card>
            <Card sx={{ m: 3, background: "#121231", color: "#CDCDCD" ,textAlign: "center" }}>
                <Typography color="#F6C927">Description</Typography>
                <p><Input
                    sx={{ color: "#CDCDCD" , background: "#21213E" }}
                    defaultValue="Hello world"
                    name="description"
                    value={contect.description}
                    onChange={handleChange}
                /></p>
                <p>{newContect.description}</p>
           
                <NavLink to={"/todo-board"}>
                    <Button
                     variant="contained" 
                     endIcon={<SaveIcon />}
                     sx={{ m: 3, background: "#21213E", color: "#CDCDCD",textAlign: "center"  }}>
                        save
                    </Button>
                </NavLink>
            </Card>
        </form>

    )
}
