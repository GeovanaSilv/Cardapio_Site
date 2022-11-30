import axios from "axios";
import AuthService from "./AuthService";
const API_URL = "http://localhost:5205/api/";// Cadastro Aluno: role professor


const user = JSON.parse(localStorage.getItem('user'));


const getPublicContent = () => {
return  axios.get(API_URL + "cardapio");
};


const headerAuthorization = () => {
    return {
        headers: {
            Authorization: 'Bearer ' + AuthService.getCurrentUser().token
        }
    }
}

const getCardapioBoard = async () => {
return await axios.get(API_URL + "cardapio", { headers: { Authorization:
'Bearer ' + user.token } });
};
const UserService = {
getPublicContent,
getCardapioBoard
};




export default UserService;