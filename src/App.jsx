import TodoBoard from "./pages/todo-board/components/TodoBoard.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme.js";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Settings from "../src/pages/Settings/Setting.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <DndProvider backend={HTML5Backend}>
          <CssBaseline />
          <main>
            <Routes>
              <Route path="/todo-board" element={<TodoBoard />} />
              <Route path="/todo-board/settings" element={<Settings />} />
            </Routes>
          </main>
        </DndProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
