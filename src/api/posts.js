import axios from 'axios';

const api = import.meta.env.VITE_SERVER_URL
const token = localStorage.getItem("authToken");

const { headers } = [
    {
        'Authorization': 'Happy',
        'Content-Type': 'application/json; charset=utf-8',
    }
];

let userID = ''

try {
  const response = await axios.get(`${api}/users/self`,
    {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json; charset=utf-8',
      }
    })

    userID = response.data.result[0]._id;
}
catch (error) {
  console.error('error: ', error);
};

const UrlDataBoard = `${api}/board/user/${userID}/read`;

export { headers,UrlDataBoard, api, token, userID};
