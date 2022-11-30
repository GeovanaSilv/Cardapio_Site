import React, { Component } from "react";
import Main from "../template/Main";
import axios from 'axios';

const title = " Cadastrar Tipo";
const urlApiTipo = "http://localhost:5205/api/Tipo";
const initialState = {
    tipoCar: {id:0, nomeTipo:'', codTipo:0},
    lista: [],
    
}

export default class tipoCardapio extends Component {

    state = {...initialState}

    componentDidMount(){
       axios(urlApiTipo).then(resp =>{
     this.setState({lista: resp.data})
        })
    }
    
    limpar(){
        this.setState({tipoCar: initialState.tipoCar});
    }

salvar(){
        const tipoCar = this.state.tipoCar;
        tipoCar.codTipo = Number(tipoCar.codTipo);
        const metodo = tipoCar.id? 'put' : 'post';
        const url = tipoCar.id? `${urlApiTipo}/${tipoCar.id}` : urlApiTipo;

        axios[metodo](url, tipoCar)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({tipoCar: initialState.tipoCar, lista})
            })

    }

    getListaAtualizada(tipoCar, add = true){
        const lista = this.state.lista.filter(a => a.id !== tipoCar.id);
       if(add) lista.unshift(tipoCar);
        return lista;
    }

    atualizaCampo(evento) {
        const tipoCar = {...this.state.tipoCar };
        tipoCar[evento.target.name] = evento.target.value;
        this.setState({ tipoCar }); 
    }

    carregar(tipoCar){
        this.setState({tipoCar})
    
    }
    remover(tipoCar)
    {
        const url =  urlApiTipo+ "/" + tipoCar.id
        if (window.confirm("Confirma remoção do cardapio: " + tipoCar.nomeTipo)) {
            console.log("entrou no confirm");
            axios['delete'](url, tipoCar)
            .then(resp => {
            const lista = this.getListaAtualizada(tipoCar, false)
            this.setState({ tipoCar: initialState.tipoCar, lista })
            })
        }
    }
}