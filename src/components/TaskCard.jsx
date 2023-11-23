import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';
import { useDrag } from "react-dnd";
import itemTypes from "../../utils/itemType";

export default function TaskCard({ id, name, task, date, listId }) {

  const [collected, drag, dragPreview] = useDrag(() => ({
    type: itemTypes.CARD,
    item: { id, listId }
  }))
  return collected.isDragging ? (
    <div ref={dragPreview} /> 
  ) : (
      <Card ref={drag} {...collected} sx={{ mt: 1, mb: 2, bgcolor: "primary.main" }}>
        <CardHeader
          action={
            <IconButton>
              <LaunchIcon sx={{ color: "#D3D3D3" }} />
            </IconButton>
          }
          title={
            <>
              <Typography variant="p" sx={{ color: "#F6C927", fontSize: "2vh" }}>
                {name}
              </Typography>
              <br />
              <Typography variant="p" sx={{ color: "#FFF" }}>
                {task}
              </Typography>
              <br />
              <Typography variant="p" sx={{ color: "#FFF", fontSize: "1.3vh" }}>
                {date}
              </Typography>
            </>
          }
          avatar={
            <IconButton>
              <Avatar src="" alt="Avatar image" />
            </IconButton>
          }
        />
      </Card>
  );
}
