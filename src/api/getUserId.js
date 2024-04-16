import makeApiRequest from "./apiRequest";

async function getUserId() {
  try {
    const data = await makeApiRequest("users/self", "GET");
    if (data) {
      return data.result[0]._id;
    }
  } catch (error) {
    console.error("Couldn't get userID:", error.message);
  }
}
const userID = await getUserId();


const api = import.meta.env.VITE_SERVER_URL;
const token = localStorage.getItem("authToken");

const headers = {
  headers: {
    Authorization: token,
    "Content-Type": "application/json; charset=utf-8",
  },
};

const UrlDataBoard = `${api}/board/user/${userID}/read`;

export { headers, UrlDataBoard, api, token, userID };
