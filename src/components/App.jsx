import TodoBoard from "./TodoBoard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../theme.js";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TodoBoard />
    </ThemeProvider>
  );
}
