//Formulario.js
//este ficheiro irá conter o código para representar o formulário no ecrã
//********************************* */

import React from 'react'

/**
 * Formulário para adicionar um veículo
 */
class Formulario extends React.Component {

    constructor(props) {
        super(props);

        //variáveis para guardar os dados introduzidos pelo utilizador, no formulário
        this.state = {
            marca: "",
            modelo: "",
            anoVeiculo: "",
            matricula: "",
            combustivel: "",
            potencia: "",
            cilindrada: "",
            km: "",
            tipoConducao: ""
        }

        // se houver dados no 'props', vamos entregá-los ao state
        if (props.inDadosVeiculo != null) {
            // se entro aqui, foi selecionado um veículo para editar
            this.state.marca = props.inDadosVeiculo.marca;
            this.state.modelo = props.inDadosVeiculo.modelo;
            this.state.anoVeiculo = props.inDadosVeiculo.anoVeiculo;
            this.state.matricula = props.inDadosVeiculo.matricula;
            this.state.combustivel = props.inDadosVeiculo.combustivel;
            this.state.potencia = props.inDadosVeiculo.potencia;
            this.state.cilindrada = props.inDadosVeiculo.cilindrada;
            this.state.km = props.inDadosVeiculo.km;
            this.state.tipoConducao = props.inDadosVeiculo.tipoConducao;
        }

        /*// criar objeto que irá receber os dados do novo Veículo
        novoVeiculo = {
            marca: "",
            modelo: "",
            anoVeiculo: "",
            matricula: "",
            combustivel: "",
            potencia: "",
            cilindrada: "",
            km: "",
            tipoConducao: ""
        }

        // adicionar este novo objeto ao 'state'
        state = this.novoVeiculo;*/

    }

    /**
     * handler para processar os dados fornecidos pelo Formulário
     * @param {*} evento 
     */
    handlerSubmitForm = (evento) => {
        //impedir o formulário de autoenviar os dados para o servidor
        //essa tarefa cabe ao componente App.js
        evento.preventDefault();

        //preparação dos dados para serem enviados para a App.js
        //podemos já enviar os dados prontos para serem adicionados à API
        let dadosFormulario = {
            idVeiculo: this.props.inDadosVeiculo?.idVeiculo,
            acao: "",
            marca: this.state.marca,
            modelo: this.state.modelo,
            anoVeiculo: this.state.anoVeiculo,
            matricula: this.state.matricula,
            combustivel: this.state.combustivel,
            potencia: this.state.potencia,
            cilindrada: this.state.cilindrada,
            km: this.state.km,
            tipoConducao: this.state.tipoConducao
        };

        //concretizar a exportação dos dados para a App.js
        this.props.outDadosVeiculos(dadosFormulario);
    }

    /**
     * handler para manipular os dados escritos pelo
     * utilizador nas textboxs do formulário
     * @param {*} evento - contém os dados escritos pelo utilizador
     */
     handlerAdicao = (evento) => {
        // ler os dados contidos no 'evento'
        // e atribuí-los às variáveis name e value
        // name - nome do objeto que foi manipulado
        // value - o conteúdo da textbox
        const { name, value } = evento.target;


        // atribuir os dados lidos à 'state'
        this.setState({
            [name]: value
        });
    }

    render() {
        // ler os dados que foram/são fornecidos à Tabela5,
        // como parâmetro de entrada/saída
        //const { inDadosVeiculos } = this.props;
        const { marca, modelo, anoVeiculo, matricula, combustivel, potencia, cilindrada, km, tipoConducao } = this.state;

        return (
            //o 'return' só consegue devolver um objeto
            <form>
                Marca: <input type="text"
                    className="form-control"
                    name="marca"
                    value={marca}
                    onChange={this.handlerAdicao}
                /><br />
                Modelo: <input type="text"
                    className="form-control"
                    name="modelo"
                    value={modelo}
                    onChange={this.handlerAdicao}
                /><br />
                AnoVeiculo: <input type="text"
                    className="form-control"
                    name="anoVeiculo"
                    value={anoVeiculo}
                    onChange={this.handlerAdicao}
                /><br />
                Matricula: <input type="text"
                    className="form-control"
                    name="matricula"
                    value={matricula}
                    onChange={this.handlerAdicao}
                /><br />
                Combustivel: <input type="text"
                    className="form-control"
                    name="combustivel"
                    value={combustivel}
                    onChange={this.handlerAdicao}
                /><br />
                Potencia: <input type="text"
                    className="form-control"
                    name="potencia"
                    value={potencia}
                    onChange={this.handlerAdicao}
                /><br />
                Cilindrada: <input type="text"
                    className="form-control"
                    name="cilindrada"
                    value={cilindrada}
                    onChange={this.handlerAdicao}
                /><br />
                Km: <input type="text"
                    className="form-control"
                    name="km"
                    value={km}
                    onChange={this.handlerAdicao}
                /><br />
                TipoCaixa: <input type="text"
                    className="form-control"
                    name="tipoConducao"
                    value={tipoConducao}
                    onChange={this.handlerAdicao}
                /><br />
                <input type="button"
                    className="btn btn-primary"
                    value="Adicionar"
                    onClick={this.handlerSubmitForm}
                />
            </form>

        )
    }
}

export default Formulario;
