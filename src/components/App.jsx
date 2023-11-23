import TodoBoard from "./TodoBoard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../theme.js";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <CssBaseline />
        <TodoBoard />
      </DndProvider>
    </ThemeProvider>
  );
}
