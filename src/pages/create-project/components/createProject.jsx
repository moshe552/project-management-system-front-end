import { Card, TextareaAutosize, Typography, Input } from "@mui/material";
import { useState, useEffect } from "react";
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import Header from "../../Porjects/components/header";
import api from "../../../api/posts";
import { Project } from "../../Porjects/components/Project";

const UrlDataBoard = 'http://localhost:3000/board/create';
const headers = {
    'Authorization': 'Happy',
    'Content-Type': 'application/json; charset=utf-8'
};

export default function CreateProject() {

    const [isSaved, setSaved] = useState(false)

    const [contect, setContect] = useState({
        "name": "",
        "description": "",
        "users": ['3242r42rf'],
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
            api.post(UrlDataBoard, contect, { headers })
                .then(response => {
                    setContect(response.data)
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
    function handleDeleteItem(id) {
        api.delete(`http://localhost:3000/board/${id}/delete`, { headers })
            .then(() => {
                alert("the project has been deleted")
                setSaved(false)
            })
            .catch(error => {
                console.error('Error fetching JSON file:', error);
            })
    }


    return (isSaved ?
        <Project
            id={contect._id}
            title={
                <NavLink
                    to={"/todo-board"}
                    style={{ color: "#F6C927" }}
                >
                    {contect.name}
                </NavLink>}
            description={contect.description}
            time={contect.creationDate}
            deleteItem={handleDeleteItem}
        /> :
        <form onSubmit={handleSaveClick}>
            <Header title="Add new project" />
            <Card sx={{ m: 3, background: "#121231", color: "#CDCDCD", textAlign: "center" }}>
                <Typography color="#F6C927" variant="h6">Title</Typography>
                <Input
                    sx={{ color: "#CDCDCD", background: "#21213E" }}
                    defaultValue="project name"
                    name="name"
                    value={contect.name}
                    onChange={handleChange}
                />
            </Card>
            <Card sx={{ m: 3, background: "#121231", color: "#CDCDCD", textAlign: "center" }}>
                <Typography color="#F6C927">Description</Typography>
                <TextareaAutosize
                    minRows={4}
                    color="#CDCDCD"
                    sx={{ color: "#CDCDCD", background: "#21213E", width: '1020px' }}
                    name="description"
                    value={contect.description}
                    onChange={handleChange}
                />
            </Card>
            <Button
                variant="contained"
                endIcon={<SaveIcon />}
                sx={{ m: 3, background: "#21213E", color: "#CDCDCD", textAlign: "center" }}
                type="submit"
            >
                Save
            </Button>
        </form>
    );
}
