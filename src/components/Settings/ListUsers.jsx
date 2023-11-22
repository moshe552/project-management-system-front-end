import { useState } from "react";
import * as React from "react";

import HeaderUsers from "./HeaderUsers";
import ItemUser from "./ItemUser";

import SettingsData from "./SettingsData";// Data outside
import DataRandom from "./DataRandom";// Data outside

import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";

function ListUsers() {

  const listDataView = SettingsData //check if not need! after
  const [dataView, setDataView] = useState(listDataView)

  const listDataModel = DataRandom //check if not need! after
  const [dataModel, setDataModel] = useState(listDataModel)


  function deleteUser(index) {
    const newList = [...dataView]
    const newListAdd = [...dataModel]
    console.log(index)

      function checkObjectUser(objectUser) {
        return objectUser.id === index;
      }

      const indexUserDelete = dataView.findIndex(checkObjectUser)
      const userAdd = newList[indexUserDelete]
      console.log(indexUserDelete)

      newList.splice(indexUserDelete,1)
      setDataView(newList)

      newListAdd.splice(newListAdd.length,0,userAdd)
      setDataModel(newListAdd)    
  }


  function addUser(index) {
    const newListAdd = [...dataView]
    const newList = [...dataModel]
    console.log(index)

      function checkObjectUser(objectUser) {
        return objectUser.id === index;
      }

      const indexUserDelete = dataModel.findIndex(checkObjectUser)
      const userAdd = newList[indexUserDelete]
      console.log(indexUserDelete)

      newList.splice(indexUserDelete,1)
      setDataModel(newList)

      newListAdd.splice(newListAdd.length,0,userAdd)
      setDataView(newListAdd)    
  }

  //Functions list!!!! view 1)
  function createUser(user) {
    
    return (
      <ItemUser
        key={user.id}
        name={user.name}
        age={user.id} // The original => age={user.age}. Now test (view change)
        text={user.text}
        FunctionType={<DeleteOutlineIcon onClick={() => deleteUser(user.id)}/>}
        
      />
    );
  }
  //Functions view 2)
  function viewMap (listUser){
    return(listUser.map(createUser))
  }
  // Functions view 3)
  function viewList (dataList){
    return(
      <List
        sx={{
          width: "100%",
          maxWidth: "100%",
          bgcolor: "#21213E",
          color: "#FFFFFF",
          overflow: 'auto',
          position: 'relative',
          maxHeight: 300
        }}
      >
        {viewMap(dataList)}
      </List>
    )
  }




  //Functions Model!!!! view 1)
  function createUserModel(user) {
    return (
      <ItemUser
        key={user.id}
        name={user.name}
        age={user.id} // The original => age={user.age}. Now test (view change)
        text={user.text}
        FunctionType={<AddCircleSharpIcon onClick={() => addUser(user.id)}/>}
        
      />
    );
  }
  //Functions view 2)
  function viewMapModel (listUser){
    return(listUser.map(createUserModel))
  }
  // Functions view 3)
  function viewListModel (dataList){
    return(
      <List
        sx={{
          width: "100%",
          maxWidth: "100%",
          bgcolor: "#21213E",
          color: "#FFFFFF",
          overflow: 'auto',
          position: 'relative',
          maxHeight: 300
        }}
      >
        {viewMapModel(dataList)}
      </List>
    )
  }

  return (
    <Grid>
      <HeaderUsers listUsers={viewListModel(dataModel)}  />

      {viewList(dataView)}
    </Grid>
  );
}

export default ListUsers;
