import { Card, } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



function Project(props) {

    return (
        <Card sx={{ m: 2 }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#CDCDCD" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ background: "#121231", color: "#CDCDCD" }}
                >
                    <Typography variant="h6">
                        <a href={props.URL}>{props.title}</a>
                    </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ background: "#121231", color: "#CDCDCD" }}>
                    <Typography variant="subyitle">
                        <hr />
                        <h5 style={{color:  "#F6C927"}}>Description</h5>
                        {props.description}
                        <p style={{fontSize: '10px'}}>{props.time}</p>
                    </Typography>
                    <IconButton
                        color="inherit"
                        edge="end"
                        aria-label="delete"
                        size="small"
                        onClick={() => { props.deleteItem(props.id), clickAdd }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </AccordionDetails>
            </Accordion>
        </Card>
    )
}


export { Project };







