import * as React from 'react';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';



export default function Header(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CardHeader position="sticky" sx={{color: "#F6C927", background: "#121231" }} title={props.title}>
      </CardHeader>
    </Box>
  );
}