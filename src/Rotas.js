import React,{useEffect,useState} from "react";
import {Routes, Route} from "react-router-dom";
import './Rotas.css';
 
import Main from './components/template/Main';
import AuthService from "./Services/AuthService";

import Logout from "./components/Logout/Logout";
import CadastroCardapio from "./components/CadastroCardapio/CadastroCardapio";
import CardapioCarometro from "./components/CardapioCarometro/CardapioCarometro";
import Login from "./components/Login/Login";



export default function Rotas(){
    const [currentUser, setCurrentUser] = useState(undefined);

    
    useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
    setCurrentUser(user);
    }
    }, []);   

return(
    <Routes>
        <Route exact path="/"
         element={
            <Main title ="Bem vindo!">
             <div className="mensagem">Seja bem Vindo </div>
            </Main>}
        />

       


            {currentUser ? (
              <Route  exact path="/Cadastro" element={<CadastroCardapio/>}/>
            ):(
                <Route  exact path="/Cadastro" element={
                    <Main title="Cadastro de Cardapio">
                    <div className="mensagem">Não autorizado!</div>
                            </Main>
                }/>
            )}
                 
    

                  
            <Route  exact path="/Carometro"element={<CardapioCarometro/>}
/>
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />    


      
            <Route path="*" to='/' />
    
    
    </Routes>
)
}