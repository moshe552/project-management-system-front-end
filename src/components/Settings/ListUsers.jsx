import { useState } from "react";
import * as React from "react";
import ItemUser from "./ItemUser";
import SettingsData from "./SettingsData";
import List from "@mui/material/List";




// Only function(whit not React)
function createUser(user) {
  const id = Math.floor(Math.random() * 10000)
  return (
    <ItemUser
      key={id}
      name={user.name}
      age={id}  // The original => age={user.age}. Now test (view change)
      text={user.text}
    />
  );
}

export default function ListUsers() {
  const [dataUser, setDataUser] = useState(SettingsData);

  function addUser() {
    const newList = [...dataUser];
    newList.splice(newList.length, 0, dataUser[0]);
    setDataUser(newList);
  }

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: "100%",
        bgcolor: "#21213E",
        color: "#FFFFFF",
      }}
    >
      <button onClick={addUser}>Click me!</button>
      {dataUser.map(createUser)}
    </List>
  );
}
