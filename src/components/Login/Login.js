import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";
import AuthService from "../../Services/AuthService";
import logo from '../../assets/logoCardapio.jpeg';

export default function Login() {

     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
   const navigate = useNavigate();
 async function handleSubmit(evento) {
 evento.preventDefault();
 const userForm = { username, password };
 if (!username || !password) {
 setMessage("Preencha o Usuário e a Senha para continuar!");
 } else {
     AuthService.login(username, password).then(
         () => {
         console.log("localStorage: " +
        
         localStorage.getItem("user"));
         navigate("/");
         window.location.reload(); // atualiza o localStorage
         },
         (error) => {
         const resMessage =
         (error.response &&
         error.response.data &&
         error.response.data.message) ||
         error.message ||
         error.toString();
         setMessage(resMessage);
         }
         );
         }
    };

        return (
            <section>
        <div class="form-container">
        <div className="logo"> <img src= {logo}  alt="Logo"/>
        </div>
        <form onSubmit={handleSubmit} className="formLogin" >
        <div className="control">
        <label className="lblLogin" htmlFor="username">Usuário:        
        </label>
        <input
        type="text"
        value={username}
        placeholder="Digite o e-mail"
        onChange={({ target }) => { setUsername(target.value); 
        setMessage(""); }}
        />
        </div>

   
        <label className="lblLogin" htmlFor="senha">Senha:
    
        </label>
        <div className="control">
        <input
        type="password"
        value={password}
        placeholder="Digite a senha"
        onChange={({ target }) => { setPassword(target.value);
            setMessage(""); }}
      />
</div>

<button className ="btnLogin "type="submit">Login</button>

<h4 className="msgErro">{message}</h4>
</form>

</div>
</section>
);
}