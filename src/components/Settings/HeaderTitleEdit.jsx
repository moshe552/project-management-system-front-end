import { useState } from "react";
import * as React from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import BorderColorIcon from "@mui/icons-material/BorderColor";

function HeaderTitleEdit() {
  const [titelPage, setTitelPage] = useState('');
  const [descriptionWrite, setDescriptionWrite] = useState('');

 

  const addTextNow = (event) => {
    const valueName = event.target.name;
    console.log(valueName);
    valueName == "title"
      ? setTitelPage(event.target.value)
      : setDescriptionWrite(event.target.value);
  };

  const [isDisabled, setIsDisabled] = useState(false);
  const holderDisabledTrue = () => setIsDisabled(true);
  const holderDisabledFalse = () => setIsDisabled(false);

  return (
    <Grid
      bgcolor={"#21213E"}
      color={"#F6C927"}
      padding={"20px"}
      fontSize={"20px"}
    >
      <Grid sx={{ color: "#F6C927",colorAdjust:"#F6C927", background: "#ffff" }}>
        <br />
        <Grid>
          <TextField 
            id="outlined-textarea"
            label="Title"
            placeholder="Enter title"
            multiline
            disabled={isDisabled}
            name="title"
            onChange={addTextNow}
            value={titelPage}
          />
        </Grid>
        <br />
        <Grid>
          <TextField
            id="outlined-textarea"
            label="Description"
            placeholder="Enter description"
            multiline
            rows={4}
            disabled={isDisabled}
            name="description"
            onChange={addTextNow}
            value={descriptionWrite}
          />
        </Grid>
        <br />
        <SaveAsIcon fontSize="large" onClick={holderDisabledTrue} />

        <BorderColorIcon fontSize="large" onClick={holderDisabledFalse} />
      </Grid>
    </Grid>
  );
}

export default HeaderTitleEdit;
