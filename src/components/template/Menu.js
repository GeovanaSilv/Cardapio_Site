import './Menu.css';
import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../Services/AuthService';
import logo from '../../assets/logoCardapio.jpeg';


export default function Menu(props){
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
        setCurrentUser(user);
        }
        }, []);
        
        
    return(

        <nav className ='scrollmenu'>
    
       <Link to ="/Carometro">Cardapio</Link>

        <Link to="/cadastro">Cadastro</Link>

           {currentUser ? (<Link to="/logout">Logout</Link>
        ) : (
   <Link to="/login">Login</Link>
)}                

        </nav>
       
    )
}