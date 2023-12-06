import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";

import { dataStartPage , updateData } from "./DataBoard" //import func data

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';


function HeaderTitleEdit() {
  const {boardId} = useParams()
  
  const [titelPage, setTitelPage] = useState("");
  const [descriptionWrite, setDescriptionWrite] = useState("");

  useEffect(() => {
    
    async function getDataBoard() {
      const theData = await dataStartPage(boardId)
      setTitelPage(theData.name)
      setDescriptionWrite(theData.description)
    }
    getDataBoard()
  },[boardId])

  async function updateDataBoard() {
    await updateData(boardId ,titelPage ,descriptionWrite)
  }
  
 const sendData = () => updateDataBoard()
  
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
      <Grid>
        <br />
        <Grid >
          <TextField 
            id="outlined-textarea"
            
            label="Title"
            placeholder="Enter title"
            multiline
            disabled={isDisabled}
            name="title"
            onChange={addTextNow}
            value={titelPage}
            InputLabelProps={{
                style: { color: "#F6C927" },
              }}
              InputProps={{
                style: { color: "#F6C927" }, 
              }}
          />
        </Grid>
        <br />
        <Grid>
          <TextField
            id="outlined-textarea"
            label="Description"
            placeholder="Enter description"
            multiline
            rows={3}
            disabled={isDisabled}
            name="description"
            onChange={addTextNow}
            value={descriptionWrite}
            InputLabelProps={{
                style: { color: "#F6C927" },
              }}
              InputProps={{
                style: { color: "#F6C927" }, 
              }}
            />
        </Grid>
          <br />
          <IconButton onClick={holderDisabledTrue} >
            <SaveAsIcon fontSize="large"  sx={{marginRight: 2 ,color: "#F6C927"}}  />
          </IconButton>

          <IconButton onClick={holderDisabledFalse} >
            <BorderColorIcon fontSize="large" sx={{marginRight: 2 ,color: "#F6C927"}} />
          </IconButton>

          <IconButton onClick={ sendData}>
            <SendIcon fontSize="large" sx={{marginRight: 2 ,color: "#F6C927"}} />
          </IconButton>
      </Grid>
    </Grid>
    
  );
}

export default HeaderTitleEdit;
