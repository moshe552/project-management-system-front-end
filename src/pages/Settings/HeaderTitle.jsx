import { useState , useEffect } from "react";
import { dataStartPage , updateData } from "./DataBoardcopy" //import func data

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SendIcon from '@mui/icons-material/Send';

function HeaderTitleEdit(props) {

  const [titelPage, setTitelPage] = useState("");
  const [descriptionWrite, setDescriptionWrite] = useState("");

  useEffect(() => {
    
    async function getDataBoard() {
      const theData = await dataStartPage(props.idBoard)
      setTitelPage(theData.name)
      setDescriptionWrite(theData.description)
    }
    getDataBoard()
  },[])

  async function updateDataBoard() {
    const theData = await updateData(props.idBoard ,titelPage ,descriptionWrite)
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
                style: { color: "#F6C927", background: "#21213E" }, 
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
                style: { color: "#F6C927", background: "#21213E" }, 
              }}
            />
        </Grid>
          <br />
            <SaveAsIcon fontSize="large" sx={{marginRight: 2}} onClick={holderDisabledTrue} />
            <BorderColorIcon fontSize="large" sx={{marginRight: 2}} onClick={holderDisabledFalse} />
            <SendIcon fontSize="large" sx={{marginRight: 2}} onClick={ sendData}/>
      </Grid>
    </Grid>
    
  );
}

export default HeaderTitleEdit;
