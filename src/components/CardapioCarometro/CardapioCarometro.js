import React, { Component } from "react";
import axios from 'axios';
import './CardapioCarometro.css';
import Main from '../template/Main';
import UserService from "../../Services/UserService";
import lanche from '../../assets/lanche1.jpeg';

const title = "Cardapio";
const initialState = {
  cardapio: { id: 0, nome: '', porcoes: 0, valor: '', codTipo: 0, nomeTipo: '', descricao: '' },
  lista: [],
  listaCarometro: [],
  mens: null
}
export default class CardapioCarometro extends Component {

  state = { ...initialState }
  componentDidMount() {

    UserService.getPublicContent().then(
      (response) => {
        this.setState({ listaCarometro: response.data })
      },
      (error) => {
        const _mens =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        this.setState({ mens: _mens })
        console.log('_mens: ' + _mens)

      }
    )
  }
  getListaAtualizadaCardapio(evento) {
    const codTipo = evento.target.value
    const lista = this.state.lista.filter(a => a.codTipo == codTipo);
    this.setState({ listaCarometro: lista });
    this.setState({ cardapio: this.state.cardapio })
  }
  atualizaCampo(evento) {
    const cardapio = { ...this.state.cardapio };
    this.setState({ cardapio });

  }


 
  MenuCards() {
    return (

      <div className="card2">


        {this.state.listaCarometro.map((cardapio) =>
          <div key={cardapio.id} className="cardInfo" sx={{ minWidth: 300 }}>
               <div className="lanche1"> <img src= {lanche}  alt="Logo"/></div>
            <span>Nome:   {cardapio.nome}</span>
            <span>porcoes : {cardapio.porcoes}</span>
            <span>Descriçoes : {cardapio.descricao}</span>
            <span>Valor : {cardapio.valor}</span>

          </div >
        )}

      </div>



    )
  }
  render() {
    return (



      <Main title={title}>
        {

          (this.state.mens != null) ? 'Problema com Conexão ou Autenticação' :
            <>

             
              {this.MenuCards()}
            </>
        }

      </Main>
    )
  }
}