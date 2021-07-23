/// *****************************************
// App.js
// *****************************************

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


// importar componentes
import Tabela from './Tabela';
import Formulario from './Formulario';

/**
 * Função   que irá ler os dados (veiculos) da API
 */
async function getVeiculos() {

  // ler os dados da API
  // https://create-react-app.dev/docs/proxying-api-requests-in-development/
  let resposta = await fetch("API/VeiculosAPI");

  if (!resposta.ok) {
    // não foi recebido o código 200 do HTTP
    console.error("Não conseguimos ler os dados da API. Código: " + resposta.status);
  }
  return await resposta.json();
}

/**
 * invoca a API e envia os dados do novo Veículo
 * @param {} dadosNovoVeiculo 
 */
 async function adicionaVeiculo(dadosNovoVeiculo){
  let formData = new FormData();
  formData.append("marca", dadosNovoVeiculo.marca);
  formData.append("modelo", dadosNovoVeiculo.modelo);
  formData.append("anoVeiculo", dadosNovoVeiculo.anoVeiculo);
  formData.append("matricula", dadosNovoVeiculo.matricula);
  formData.append("combustivel", dadosNovoVeiculo.combustivel);
  formData.append("potencia", dadosNovoVeiculo.potencia);
  formData.append("cilindrada", dadosNovoVeiculo.cilindrada);
  formData.append("km", dadosNovoVeiculo.km);
  formData.append("tipoConducao", dadosNovoVeiculo.tipoConducao);


  let resposta = await fetch("API/VeiculosAPI", {
    method: "POST",
    body: formData
  });

  //verifica se os dados não foram enviados para a API mostra a mensagem de erro juntamente com o estado da resposta
  if (!resposta.ok) {
    console.error(resposta);
    throw new Error('Não foi possível enviar os dados do novo Veículo. Código= ' + resposta.status);
  }

  //Devolver os dados a seres usados na componente
  return await resposta.json();
}

async function removeVeiculo(dadosVeiculoremover) {

  let resposta = await fetch("API/VeiculosAPI/" + dadosVeiculoremover.idVeiculo, {
    method: "DELETE"
  });

  //verifica se os dados não foram enviados para a API mostra a mensagem de erro juntamente com o estado da resposta
  if (!resposta.ok) {
    console.error(resposta);
    throw new Error('Não foi possível enviar os dados do novo veículo. Código= ' + resposta.status);
  }

  //Devolver os dados a seres usados na componente
  //return await resposta.json();

}



/**
 * Componente principal do meu projeto
 */
class App extends React.Component {


  /**
   * Construtor da classe -> tem sempre este nome
   */
  constructor(props) {
    super(props); // <--- esta É SEMPRE a primeira instrução

    this.state = {
      /**
       * array que irá conter os dados dos veículos, vindas da API
       */
      veiculos: [],
      /**
       * variável para conter o 'estado' da app, 
       * no carregamento dos dados dos Veículos, da API
       * @type{"carregando dados" | "sucesso" | "erro"}
       */
      loadState: "",
      /**
       * guarda a mensagem de erro, se algo correr mal
       */
      errorMessage: null
    }
  }

  /**
   * Quando o objeto é criado, executa o código aqui escrito
   * Vamos usá-lo para carregar os dados da API
   */
  componentDidMount() {
    // ler os dados dos Veículos e adicioná-los à state 'veiculos'
    this.LoadVeiculos();
  }

  /**
   * Carrega os dados dos veículos da API e adiciona-os ao array 'veiculos'
   */
  async LoadVeiculos() {
    /* Tarefas:
     *   1. Ler os dados da API (fetch)
         2. atualizar os dados na var. state
     */
    try {
      // 1.
      this.setState({ loadState: "carregando dados" });
      let veiculosVindosDaAPI = await getVeiculos();

      // 2.
      this.setState({
        veiculos: veiculosVindosDaAPI,
        loadState: "sucesso"
      });
    } catch (erro) {
      this.setState({
        loadState: "erro",
        errorMessage: erro.toString()
      });
      console.error("Erro na leitura dos veículos da API", erro);
    }
  }


  /**
 * método que sabe identificar o 'veículo' que deverá ser retirado da tabela
 * @param {*} idVeiculo - dados do veículo a remover
 */
  handlerremoveVeiculo = async (idVeiculo) => {
    /*
     * Tarefas:
     * 1 - preparar os dados para serem enviados para a API
     * 2 - enviar os dados para a API
     * 3 - efetuar o reload da tabela 
     */
    /**
    * 1 - já se encontra feito através do parâmetro de entrada -dadosdoFormulario- que já contém os daods formatados
    */
    try {
      //Ponto 2
      await removeVeiculo(idVeiculo);

      //Ponto 3
      await this.LoadVeiculos();
    } catch (erro) {
      this.setState({
        errorMessage: erro.toString()
      });
      console.error("Erro ao submeter os dados do novo veículo; ", erro)
    }
   // window.location.reload();
  }


  /**
     * processar os dados recolhidos pelo Formulário
     * @param {*} dadosDoFormulario 
     */

  handlerDadosForm = async (dadosdoFormulario) => {
    /* 
     * Tarefas:
     * 1 - preparar os dados para serem enviados para a API
     * 2 - enviar os dados para a API
     * 3 - efetuar o reload da tabela 
     **/

    /*
     * 1 - já se encontra feito através do parâmetro de entrada -dadosdoFormulario- que já contém os daods formatados
     **/

    try {
      //Ponto 2
      await adicionaVeiculo(dadosdoFormulario);

      //Ponto 3
      await this.LoadVeiculos();
    } catch (erro) {
      this.setState({
        errorMessage: erro.toString()
      });
      console.error("Erro ao submeter os dados do novo veículo; ", erro)
    }
    window.location.reload();
  }


  render() {
    //recuperar os dados do 'state' para usar dentro deste método
    const { veiculos } = this.state;

    //determinar o comportamento do 'componente', 
    //em função do seu estado
    switch (this.state.loadState) {
      case "carregando dados":
        return <p>A carregar os dados. Aguarde, por favor.</p>
      case "erro":
        return <p>Ocorreu um erro: {this.state.errorMessage + '.' ?? "Não sabemos qual"}</p>
      case "sucesso":
        return (
          <div className="container">
            <h1>Veículos</h1>
            {/* adição do Formulário que há-de recolher os dados do novo Veículo */}
            <Formulario inDadosVeiculos={veiculos} outDadosVeiculos={this.handlerDadosForm} />

            <div className="row">
              <div className="col-md-20">
                <hr />
                <h3>Tabela com os Veículos</h3>
                {/* Tabela5 tem um 'parâmetro de entrada', chamado 'inDadosVeiculos'.
                Neste caso, está a receber o array JSON com os dados dos veiculos,
                lidos da API */}
                <Tabela inDadosVeiculos={veiculos} veiculo={this.handlerremoveVeiculo} />
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  }
}
export default App;