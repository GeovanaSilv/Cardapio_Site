import React, { Component } from "react";
import UserService from "../../Services/UserService";
import Main from "../template/Main";
import './CadastroCardapio.css';
import axios from 'axios';

const title = "Cadastrar Cardapio";
const urlApiMenu = "http://localhost:5205/api/cardapio";
const urlApiTipo = "http://localhost:5205/api/Tipo";
const initialState = {
    cardapio: { id: 0, nome: '', porcoes: 0, valor: '', nomeTipo: '', codTipo: 0, descricao: '' },
    lista: [],
    listaTipo: [],
    mens: null
}

const user = JSON.parse(localStorage.getItem("user"))


export default class CadastroCardapio extends Component {
    state = { ...initialState }

    componentDidMount() {
        UserService.getCardapioBoard().then(
            (response) => {
                this.setState({ lista: response.data })
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








    limpar() {
        this.setState({ cardapio: initialState.cardapio });
    }

    salvar() {
        const cardapio = this.state.cardapio;
        cardapio.porcoes = Number(cardapio.porcoes);
        const metodo = cardapio.id ? 'put' : 'post';
        const url = cardapio.id ? `${urlApiMenu}/${cardapio.id}` : urlApiMenu;

        axios[metodo](url, cardapio)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ cardapio: initialState.cardapio, lista })
            })

    }

    getListaAtualizada(cardapio, add = true) {
        const lista = this.state.lista.filter(a => a.id !== cardapio.id);
        if (add) lista.unshift(cardapio);
        return lista;
    }

    atualizaCampo(evento) {
        const cardapio = { ...this.state.cardapio };
        cardapio[evento.target.name] = evento.target.value;
        this.setState({ cardapio });
    }

    carregar(cardapio) {
        this.setState({ cardapio })

    }
    remover(cardapio) {
        const url = urlApiMenu + "/" + cardapio.id
        if (window.confirm("Confirma remoção do cardapio: " + cardapio.nome)) {
            console.log("entrou no confirm");
            axios['delete'](url, cardapio)
                .then(resp => {
                    const lista = this.getListaAtualizada(cardapio, false)
                    this.setState({ cardapio: initialState.cardapio, lista })
                })
        }
    }
    formulario() {
        return (

            <div className="inclui-cardapio">

                <label className="lbl"> Nome: </label>
                <input
                    type="text"
                    id="nome"
                    placeholder="Nome"
                    className="form-input"
                    name="nome"

                    value={this.state.cardapio.nome}

                    onChange={e => this.atualizaCampo(e)}
                />

                <label className="lbl"> porçoes: </label>
                <input
                    type="number"
                    id="porcoes"
                    placeholder="Quantidade Que rende "
                    className="form-input"
                    name="porcoes"

                    value={this.state.cardapio.porcoes}
                    onChange={e => this.atualizaCampo(e)}
                />

                <br></br>

                <label className="lbl"> Valor: </label>
                <input
                    type="text"
                    id="valor"
                    placeholder="valor da comida"
                    className="form-input"
                    name="valor"

                    value={this.state.cardapio.valor}
                    onChange={e => this.atualizaCampo(e)}
                />

                <label className="lbl"> Descrição: </label>
                <input
                    type="text"
                    id="descricao"
                    placeholder="Descrição da comida"
                    className="form-input"
                    name="descricao"

                    value={this.state.cardapio.descricao}

                    onChange={e => this.atualizaCampo(e)}
                />


                <button className="btnSalvar"
                    onClick={e => this.salvar(e)} >
                    Salvar
                </button>

                <button className="btnCancelar"
                    onClick={e => this.limpar(e)} >
                    Cancelar
                </button>
            </div>

        )
    }


    tabela() {
        return (
            <div className="listagem">
                <table className="listamenu" id="tblListaMenu">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tbTa">Nome</th>
                            <th className="tbTa">Porçoes</th>
                            <th className="tbTa">Valor</th>
                            <th className="tbTa">Descrição</th>
                            <th className="tbTa" colSpan={2}>Editar Cardapio</th>

                        </tr>
                    </thead>


                    <tbody>

                        {this.state.lista.map(
                            (cardapio) =>
                                <tr key={cardapio.id}>
                                    <td>{cardapio.nome}</td>
                                    <td>{cardapio.porcoes}</td>
                                    <td>{cardapio.valor}</td>
                                    <td>{cardapio.descricao}</td>
                                    <td >
                                        <button className="btnAltera" onClick={() => this.carregar(cardapio)} >
                                            Editar
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btnRemove" onClick={() => this.remover(cardapio)} >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        return (
            <Main title={title}>
                {

                    (this.state.mens != null) ? 'Erro' :
                        <>

                            {this.formulario()}
                            {this.tabela()}
                        </>
                }
            </Main>
        )
    }
}