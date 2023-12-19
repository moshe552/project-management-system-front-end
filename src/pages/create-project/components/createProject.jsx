import { Card, TextareaAutosize, Typography, Input } from "@mui/material";
import { useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import { NavLink, useParams  } from "react-router-dom";
import Header from "../../Porjects/components/header";
import {api} from "../../../api/posts";
import { Project } from "../../Porjects/components/Project";

const UrlDataBoard = 'http://localhost:3000/board/create';
const headers = {
    'Authorization': 'Happy',
    'Content-Type': 'application/json; charset=utf-8'
};
const token = localStorage.getItem("authToken");
console.log("token: " + token)

let userID = ''
// const userID = '4123r243f'

try {
    const response = await api.get(`http://localhost:3000/users/self`,
    {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json; charset=utf-8',
        }
    })
        console.log('user id:', response.data.result[0]._id);
        userID = response.data.result[0]._id;}
    catch(error) {
        console.error('error: ', error.message);
    };

export default function CreateProject() {
    
    const { id } = useParams();
    console.log(id);

    const [isSaved, setSaved] = useState(false)

    const [contect, setContect] = useState({
        "name": "",
        "description": "",
        "users": [userID],
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
                    history.push('/todo-board');
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
                to={`/Projects/todo-board/${contect._id}`}
                    style={{ color: "#F6C927", textDecoration: "none"}}
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
            </Card >
        </form>
    );
}
