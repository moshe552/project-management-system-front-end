import TodoBoard from "./pages/todo-board/components/TodoBoard.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme.js";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Settings from "../src/pages/Settings/Setting.jsx";
import ListProject from "./pages/Porjects/components/listProjects.jsx";
import CreateProject from "./pages/create-project/components/createProject.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <DndProvider backend={HTML5Backend}>
          <CssBaseline />
          <main>
            <Routes>
              <Route path="/todo-board/:id" element={<TodoBoard />} />
              <Route path="/todo-board/settings" element={<Settings />} />
              <Route path="/Projects" element={<ListProject/>} />
              <Route path="/Projects/creatProject" element={<CreateProject/>} />
            </Routes>
          </main>
        </DndProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
