import axios from "axios";
import { api, token } from "../../api/getUserId";
// import { useProjectsContext } from '../../context/useProjectContext'

const myToken = token;
const urlGeneral = `${api}/`;
const urlUsers = urlGeneral + `users/`;
const urlBoard = urlGeneral + `board/`;

async function dataUsersIn(idBoard) {
  const response = await axios.post(
    urlUsers + "in",
    { boardID: idBoard },
    { headers: { authorization: myToken } }
  );
  //  console.log(response.data.result)
  return response.data.result;
}

async function dataUsersEx(idBoard) {
  const response = await axios.post(
    urlUsers + "ex",
    { boardID: idBoard },
    { headers: { authorization: myToken } }
  );
  //   console.log(response.data.result)
  return response.data.result;
}

async function usersAdd(idBoard, idUser) {
  const response = await axios.patch(
    urlBoard + idBoard + "/update/users/add",
    { userId: idUser },
    { headers: { authorization: myToken } }
  );
  console.log("Data updated successfully:");
}

async function usersDelete(idBoard, idUser) {
  const response = await axios.patch(
    urlBoard + idBoard + "/update/users/remove",
    { userId: idUser },
    { headers: { authorization: myToken } }
  );
  console.log(idUser, 2);
  console.log("Data updated successfully:");
}

export { dataUsersIn, dataUsersEx, usersAdd, usersDelete };
