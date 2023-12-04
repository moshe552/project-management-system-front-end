
import { Card, TextField } from "@mui/material";
import { useState } from "react";
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

            <Grid >
            <Card sx={{ m: 3, background: "#121231", color: "#CDCDCD", textAlign: "center" }}>
          <TextField 
            id="outlined-textarea"
            label="Title"
            placeholder="Enter title"
            multiline
            name="name"
            onChange={handleChange}
            value={contect.name}
            InputLabelProps={{
                style: { color: "#F6C927" },
              }}
              InputProps={{
                style: { color: "#F6C927", background: "#21213E" }, 
              }}
          />
          </Card>
        </Grid>
        <br />
        <Card sx={{ m: 3, background: "#121231", color: "#CDCDCD", textAlign: "center" }}>
        <Grid>
          <TextField
            id="outlined-textarea"
            label="Description"
            placeholder="Enter description"
            multiline
            minRows={4}
            disabled={isDisabled}
            name="description"
            onChange={handleChange}
            value={contect.description}
            InputLabelProps={{
                style: { color: "#F6C927" },
              }}
              InputProps={{
                style: { color: "#F6C927", background: "#21213E" }, 
              }}
            />
        </Grid>
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
