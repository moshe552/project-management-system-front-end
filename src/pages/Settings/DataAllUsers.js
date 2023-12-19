import axios from "axios";

const myToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jb20iLCJ0aW1lc3RhbXAiOjE3MDE1OTI1NjA5MjEsImlhdCI6MTcwMTU5MjU2MCwiZXhwIjo4NjU3MDE1OTI1NjB9.4o47zJ1r8215n0j8baBktRYqgMCMPlIBf-iSxRLkpII`
const urlAllUsers = "http://127.0.0.1:3000/users/all"
const headers = {
    'Authorization': myToken, 
    'Content-Type': 'application/json; charset=utf-8'
  };

  export default async function dataAllUsers () {
    const response = await axios.get( urlAllUsers ,{headers})
    console.log(response.data.result)

    return response.data.result
}
