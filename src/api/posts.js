const api = import.meta.env.VITE_SERVER_URL
const token = localStorage.getItem("authToken");

const { headers } = [
    {
        'Authorization': 'Happy',
        'Content-Type': 'application/json; charset=utf-8',
    }
];

export {api, token, headers} ;

