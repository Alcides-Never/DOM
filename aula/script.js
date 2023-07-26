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
    event.preventDefault()

    console.log("função executada com sucesso")

    let usuario = receberValores()

    let imcCalculado = calcularIMC(usuario.altura, usuario.peso)

    let classificacaoIMC = classificarIMC(imcCalculado)

    console.log(classificacaoIMC)
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