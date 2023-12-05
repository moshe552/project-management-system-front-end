import axios from "axios";

let id = "6565fd5270c020b6ee023877"
  // Define the URL of the JSON file
  const jsonUrlDataBoard = 'http://localhost:3000/board/';
    
  // Define the custom header
  const headers = {
    'Authorization': 'Happy', 
    'Content-Type': 'application/json; charset=utf-8'
  };
  

//   Read!
  function startPage(theTitle,theDesc)  {
  // Make the GET request with Axios
  axios.get(jsonUrlDataBoard + id + "/read", { headers })
    .then(response => {
      // Handle the JSON data
      theTitle(response.data.name)
      theDesc(response.data.description)
      
    })
    .catch(error => {
      // Handle errors
      console.error('Error fetching JSON file:', error);
    })}





//  Update
function updateData(theTitle, theDesc) {
    // Make the PATCH request with Axios
    axios.patch(jsonUrlDataBoard + id + "/update", {
      name: theTitle,
      description: theDesc,
    }, { headers })
      .then(response => {
        // Handle the response data
        console.log('Data updated successfully:', response.data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error updating data:', error);
      });
  }


export {startPage , updateData} ; 