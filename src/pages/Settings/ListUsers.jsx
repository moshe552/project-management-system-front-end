import { useState, useEffect } from "react";
import * as React from "react";
import { useParams } from "react-router-dom";
import HeaderUsers from "./HeaderUsers";
import ItemUser from "./ItemUser";

import { dataUsersEx, dataUsersIn, usersAdd, usersDelete } from "./DataUsers";

import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import { UseContext } from "../../context/UseContext";
import { ProjectsContext } from "../../context/projectContext";

const styleList = {
  width: "100%",
  maxWidth: "100%",
  bgcolor: "#21213E",
  color: "#FFFFFF",
  overflow: "auto",
  position: "relative",
  maxHeight: 300,
};

function ListUsers() {
  const { boardId } = useParams();
  const [dataModel, setDataModel] = useState([]);
  const [dataView, setDataView] = useState([]);

  // projects context
  const { projects } = UseContext(ProjectsContext);
  const myProject = projects && projects.find((p) => p._id === boardId);

  // console.log(myProject)
  useEffect(() => {
    async function getUsers() {
      const usersIn = await dataUsersIn(boardId);
      const usersEx = await dataUsersEx(boardId);

      setDataView(usersIn);
      setDataModel(usersEx);
    }
    getUsers();
  }, []);

  // Delete func //////////////////////////
  function deleteUser(currentIdDelete) {
    const listAdd = [...dataModel];
    const listDelete = [...dataView];

    // alert("Your delete user")

    const indexUserInList = dataView.findIndex(
      (currentUser) => currentUser._id === currentIdDelete
    );

    const userAdd = dataView[indexUserInList];
    // console.log(userAdd)

    listDelete.splice(indexUserInList, 1);
    setDataView(listDelete);

    listAdd.splice(listAdd.length, 0, userAdd);
    setDataModel(listAdd);

    //Send to server data
    const deleteUserToData = () => usersDelete(boardId, currentIdDelete);
    deleteUserToData();
    myProject.users = myProject.users.filter((u) => u !== currentIdDelete);
    // console.log(listDelete)
  }

  // Add func //////////////////////////
  function addUser(currentId) {
    const listAdd = [...dataView];
    const listDelete = [...dataModel];

    // alert("Your add user")
    const indexUserInList = dataModel.findIndex(
      (currentUser) => currentUser._id === currentId
    );

    // console.log("This is id" + currentId)

    const userAdd = dataModel[indexUserInList];
    // console.log(userAdd)

    listDelete.splice(indexUserInList, 1);
    setDataModel(listDelete);

    listAdd.splice(listAdd.length, 0, userAdd);
    setDataView(listAdd);

    //Send to server data
    const addUserToData = () => usersAdd(boardId, currentId);
    addUserToData();
    myProject.users = [...myProject.users, currentId];
    // console.log(listAdd)
  }

  //Functions list!!!! view 1)
  function createUser(user) {
    return (
      <ItemUser
        key={user._id}
        firstName={user.firstName}
        lastName={user.lastName}
        email={user.email}
        title={user.title}
        FunctionType={
          <DeleteOutlineIcon onClick={() => deleteUser(user._id)} />
        }
      />
    );
  }
  //Functions view 2)
  function viewMap(listUser) {
    return listUser.map(createUser);
  }
  // Functions view 3)
  function viewList(dataList) {
    return <List sx={styleList}>{viewMap(dataList)}</List>;
  }

  //Functions Model!!!!  1)
  function createUserModel(user) {
    return (
      <ItemUser
        key={user._id}
        firstName={user.firstName}
        lastName={user.lastName}
        title={user.title}
        email={user.email}
        FunctionType={<AddCircleSharpIcon onClick={() => addUser(user._id)} />}
      />
    );
  }
  //Functions Model 2)
  function viewMapModel(listUser) {
    return listUser.map(createUserModel);
  }
  // Functions Model 3)
  function viewListModel(dataList) {
    return <List sx={styleList}>{viewMapModel(dataList)}</List>;
  }

  return (
    <Grid>
      <HeaderUsers listUsers={viewListModel(dataModel)} />

      {viewList(dataView)}
    </Grid>
  );
}

export default ListUsers;
