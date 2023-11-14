import { Container, Grid } from "@mui/material";
import TodoCard from "./TodoCard";

export default function TodoBoard() {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
            <TodoCard />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
            <TodoCard />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
            <TodoCard />
        </Grid>
      </Grid>
    </Container>
  );
}
