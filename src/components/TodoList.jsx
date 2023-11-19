import { Card, CardHeader, Typography, Container, Stack } from "@mui/material";
import TodoCard from "./TodoCard";

export default function TodoList() {
  return (
    <Container
      sx={{ bgcolor: "secondary.main", borderRadius: 2 }}
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Stack>
        <Card sx={{bgcolor: "primary.main", mb: 2, mt: 2}}>
          <CardHeader
            title={
              <Typography variant="p" sx={{ color: "#FFF"}}>
                Status
              </Typography>
            }
          />
        </Card>
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />
      </Stack>
    </Container>
  );
}
