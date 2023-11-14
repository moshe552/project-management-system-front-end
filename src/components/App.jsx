import {Container, Grid} from "@mui/material";
import TodoBoard from "./TodoBoard";
import Settings from "./Settings/Setting";
import './Settings/Settings.css'



export default function App() {
  return (
    // <Container>
    //   <TodoBoard />
      
    // </Container>
    <Grid>
      <Settings />
    </Grid>
  )}
