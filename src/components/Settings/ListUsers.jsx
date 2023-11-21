import { useState } from "react";
import * as React from "react";
import ItemUser from "./ItemUser";
import SettingsData from "./SettingsData";// Data outside
import List from "@mui/material/List";
import HeaderUsers from "./HeaderUsers";
import Grid from "@mui/material/Grid";

function ListUsers() {

  function deleteUser(index) {
    console.log(index)
    const newList = [...dataUser];
    newList.splice(index - 1, 1);
    setDataUser(newList);
  }


  function myNewUser() {
     return(
    [{ id: "Whiting for database", name: "Aviv Taori", age: 26, text: "Hello world" }]
  )}

  function createUser(user,index) {
    
    return (
      <ItemUser
        key={index + 1}
        name={user.name}
        age={index + 1} // The original => age={user.age}. Now test (view change)
        text={user.text}
        deleteUser={() => deleteUser(index)}
      />
    );
  }

  const [dataUser, setDataUser] = useState(myNewUser);

  function addUser() {
    const newList = [...dataUser];
    newList.splice(newList.length, 0, myNewUser);
    setDataUser(newList);
  }

  return (
    <Grid>
      <HeaderUsers add={addUser} />

      <List
        sx={{
          width: "100%",
          maxWidth: "100%",
          bgcolor: "#21213E",
          color: "#FFFFFF",
        }}
      >
        {dataUser.map(createUser)}
      </List>
    </Grid>
  );
}

export default ListUsers;
