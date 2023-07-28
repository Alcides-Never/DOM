// Algoritmo

// 1- Pegar os valores do input
// 2- Fazer o calculo do IMC -> Retorna o valorIMC
// 3- Gerar a classificação IMC -> classificacaoIMC
// 4- Organizar os dados do usuário para salvar na lista e gerar a data 
// 5- Inserir  o usuario na lista (Salvar no local storage)
// 6- Função para carregar os usuários (localStorage), chamar ao carregar a página
// 7- Renderizar o conteúdo da tabela com os usuários cadastrados
// 8- Botão para limpar os registros(localStorage)


function calcular(event){
    
    //Previne o recarregar da página
    event.preventDefault()

    console.log("função executada com sucesso")

    //Passo 1
    let usuario = receberValores()

    //Passo 2
    let imcCalculado = calcularIMC(usuario.altura, usuario.peso)

    //Passo 3
    let classificacaoIMC = classificarIMC(imcCalculado)

    console.log(classificacaoIMC)

    //Passo 4
    usuario = organizarDados(usuario, imcCalculado, classificacaoIMC)

    //Passo 5
    cadastrarUsuario(usuario)

    window.location.reload()
    
}

function receberValores(){

    let nomeRecebido = document.getElementById("nome").value.trim()
    let alturaRecebida = document.getElementById("altura").value
    let pesoRecebido = document.getElementById("peso").value

    let dadosUsuario = {
        nome: nomeRecebido,
        altura: alturaRecebida,
        peso: pesoRecebido
    }

    console.log(dadosUsuario)

    return dadosUsuario
}

function calcularIMC(altura, peso){
    let imc = peso / (altura*altura)
    
    console.log(imc)
    
    return imc
}

function classificarIMC(imc){
    /*
    Resultado           Situação
    Abaixo de 18.5      Abaixo do Peso
    Entre 18.5 e 24.99  Peso Normal
    Entre 25 e 29.99    SobrePeso
    Acima 30            Obesidade
    */

    if (imc < 18.5){
        return "Abaixo do peso"
    } else if (imc >= 18.5 && imc < 25){
        return "Peso Normal"
    } else if (imc >= 25 && imc < 30) {
        return "Sobrepeso"
    } else {
        return "Obesidade"
    }
}
// Abaixo os parametros serve para chamar os dados de outro escopo
function organizarDados(dadosUsuario, valorIMC, classificacaoIMC){
    // let dataHoraAtual = new Date().toISOString()
    // Pega a Data e Hora atual
    let dataHoraAtual = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now())

    console.log(dataHoraAtual);

    //Organizando Objeto para salvar
    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        imc: valorIMC,
        situacaoIMC: classificacaoIMC,
        dataCadastro: dataHoraAtual
    }

    return dadosUsuarioAtualizado;
}

// Cadastro dos usuários
function cadastrarUsuario(dadosUsuario){
    let listaUsuarios = []

    //Este comando insere o dado no base do navegador
    // localStorage.setItem("nomeUsuario", "Thiago")

    // if(localStorage.getItem("usuariosCadastrados") != mull ){
    //     listaUsuarios = localStorage.getItem("usuariosCadastrados") 
    // }


    //Se houver uma lista de usuarios no locaStorage, carrega isso para variavel listaUsuarios
    if(localStorage.getItem("usuariosCadastrados") != null ){
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados")) 
    }

    //Adiciona o usuario na lista de usuarios
    listaUsuarios.push(dadosUsuario)

    // salva a listaUsuarios no localStorage
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))

}

function carregarUsuarios(){
    let listaCarregada = []

    if(localStorage.getItem("usuariosCadastrados") != null){
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    if(listaCarregada.length == 0){
        // Se nao tiver nenhum usuario cadastrados, mostrar mensagem
        let tabela = document.getElementById("corpo-tabela")

        tabela.innerHTML = `<tr class='linha-mensagem'>
            <td colspan="6">Nenhum usuario cadastrado :( </td>
        </tr>`
    } else{
        //montar conteudo da tela
        montarTabela(listaCarregada)
    }
    console.log(listaCarregada)
}

window.addEventListener("DOMContentLoaded", () => carregarUsuarios())


//Passo 7 
function montarTabela(listaUsuarios){
    let tabela = document.getElementById("corpo-tabela")

    let template = ""

    listaUsuarios.forEach(usuario => {
        template += `<tr>
                    <td data-cell="nome">${usuario.nome}</td>
                    <td data-cell="altura">${usuario.altura}</td>
                    <td data-cell="peso">${usuario.peso}</td>
                    <td data-cell="valor do IMC">${usuario.imc.toFixed(2)}</td>
                    <td data-cell="classificação do IMC">${usuario.situacaoIMC}</td>
                    <td data-cell="data de cadastro">${usuario.dataCadastro}</td>
                </tr>`
    })

    tabela.innerHTML = template;
}

function deletarRegistros(){
    
    // Remove o item do localStorage
    localStorage.removeItem("usuariosCadastrados")

    //rECARREGA A pAGINA
    window.location.reload()
}