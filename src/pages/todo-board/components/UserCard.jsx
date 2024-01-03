import { Avatar, Card, CardHeader, Typography } from "@mui/material";

export default function UserCard({
  firstName,
  lastName,
  title,
  profilePicture,
}) {
  return (
    <Card sx={{ mt: 1, mb: 2, bgcolor: "primary.main" }}>
      <CardHeader
        title={
          <>
            <Typography variant="p" sx={{ color: "#F6C927", fontSize: "2vh" }}>
              {firstName + " " + lastName}
            </Typography>
            <br />
            <Typography variant="p" sx={{ color: "#F6C927", fontSize: "2vh" }}>
              {title}
            </Typography>
          </>
        }
        avatar={<Avatar src={profilePicture} alt="Avatar image" />}
      />
    </Card>
  );
}
