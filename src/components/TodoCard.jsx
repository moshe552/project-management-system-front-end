import { Avatar, Card, CardHeader, IconButton, Typography } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material"

export default function TodoCard() {
  return (
    <>
      <Card>
        <CardHeader action={
            <IconButton>
                <DeleteOutlined />
            </IconButton> 
        }
        title={<Typography variant="h4">Hello World!</Typography>}
        avatar={<Avatar src="" alt="Avatar image" />}
         />
         <Typography variant="h6">Contect</Typography>
         <Typography variant="p">Details</Typography>
      </Card>
    </>
  );
}
