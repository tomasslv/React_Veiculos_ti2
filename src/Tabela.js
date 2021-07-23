// Tabela.js
// ****************************************************** 

import React from 'react'

// função que devolve o Cabeçalho da tabela
function CabecalhoTabela() {
    return (
        <thead>
            <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Ano do Veículo</th>
                <th>Combustível</th>
                <th>Matrícula</th>
                <th>Potência</th>
                <th>Cilindrada</th>
                <th>Km</th>
                <th>Tipo de Caixa</th>
                <th></th>
            </tr>
        </thead>
    )
}

// definição da função que devolve o Corpo da tabela
// faz exatamente o mesmo da linha 7
const CorpoTabela = (props) => {
    // esta função 'interna' irá ler e processar todos
    // os objetos definidos dentro do array 'dadosRecebidos'
    const rows = props.dadosRecebidos.map((row) => {
        return (
            <tr key={row.idVeiculo}>
                <td>{row.marca}</td>
                <td>{row.modelo}</td>
                <td>{row.anoVeiculo}</td>
                <td>{row.combustivel}</td>
                <td>{row.matricula}</td>
                <td>{row.potencia}</td>
                <td>{row.cilindrada}</td>
                <td>{row.km}</td>
                <td>{row.tipoConducao}</td>
                <td>
                    <button className="btn btn-outline-danger"
                        onClick={() => props.veiculoAremover(row)}
                    >
                        Apagar Veículo
                    </button>
                </td>
            </tr>
        )
    })

    // valor devolvido pela função 'CorpoTabela'
    return (<tbody>{rows}</tbody>)
}

// componente que junta os dois sub-componentes, formando um novo 'componente'
class Tabela extends React.Component {
    render() {

        // estamos a ler os dados que são recebidos pelo componente
        // <=> this.props.dadosVeiculos
        const { inDadosVeiculos, veiculo } = this.props

        return (
            <table className="table table-striped table-success">
                <CabecalhoTabela />
                {/* o parâmetro 'dadosRecebidos' irá ajudar ao processamento
                    dos dados que vêm da componente 'mãe' */}
                <CorpoTabela dadosRecebidos={inDadosVeiculos} veiculoAremover={veiculo} />
            </table>
        )
    }
}


export default Tabela

