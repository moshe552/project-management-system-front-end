import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export default function TodoCard() {
  return (
    <>
      <Card sx={{ mt: 1, mb: 2, bgcolor: "primary.main" }}>
        <CardHeader
          action={
            <IconButton>
              <SettingsIcon />
            </IconButton>
          }
          title={
            <>
              <Typography variant="p" sx={{ color: "#F6C927" }}>
                Name
              </Typography>
              <br/>
              <Typography variant="p" sx={{ color: "#FFF" }}>
                Task
              </Typography>
              <br/>
              <Typography variant="p" sx={{ color: "#FFF", fontSize: "1vh"}}>
                Date
              </Typography>
            </>
          }
          avatar={<Avatar src="" alt="Avatar image" />}
        />
      </Card>
    </>
  );
}
