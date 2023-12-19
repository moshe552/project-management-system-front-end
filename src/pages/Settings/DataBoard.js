import axios from "axios";


const jsonUrlDataBoard = `${import.meta.env.VITE_SERVER_URL}/board/`;
const headers = {
  Authorization: "Happy",
  "Content-Type": "application/json; charset=utf-8",
};

// Read!
async function dataStartPage(idBoard) {
  const response = await axios.get(jsonUrlDataBoard + idBoard + "/read",
   {headers});
  return response.data;
}

//  Update
async function updateData(idBoard , theTitle, theDesc) {
  const response = await axios.patch(jsonUrlDataBoard + idBoard + "/update",
  { name: theTitle,
    description: theDesc,},
   {headers});
  console.log("Data updated successfully:", response.data);
}


export { dataStartPage , updateData };
