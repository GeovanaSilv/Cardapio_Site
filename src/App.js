import './App.css';

import Menu from './components/template/Menu';
import Footer from './components/template/Footer'
import Rotas from './Rotas';



import { BrowserRouter } from 'react-router-dom';

export default function App(){
  return(
    <BrowserRouter>
      <div className="App">
    
        <Menu />
        <Rotas />
     
</div>
    </BrowserRouter>
  )
}