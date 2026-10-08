let inputNome = document.querySelector(`#clientName`)
let inputDataNascimento = document.querySelector(`#birthDate`)
let inputCPF = document.querySelector(`#clientCPF`)
let inputEmprestimo = document.querySelector(`#loanAmount`)
let inputTaxaJurosSimples = document.querySelector(`#interestRate`)
let inputQuantidadeParcelas = document.querySelector(`#installments`)

let resultBox = document.querySelector(`#resultBox`)

function coletaDados() {
    let nome = inputNome.value
    let dataNascimento = inputDataNascimento.value
    let CPF = inputCPF.value
    let Emprestimo = inputEmprestimo.value
    let TaxaJurosSimples = inputTaxaJurosSimples.value
    let QuantidadeParcelas = inputQuantidadeParcelas.value

    if(checagemDados() == false){
        return
    }

    let dataHoje = prompt("Qual a data de hoje? formato ano-mês-dia em 8 digitos: '0000-00-00' ")
    if (dataHoje.length != 10) {
        alert(`data possivelmente errada. ${dataHoje.length} digitos. tente denovo em calcular emprestimo`)
        return
    }

    let { anosTotais } = calcularDados(nome, dataNascimento, CPF, Emprestimo, TaxaJurosSimples, QuantidadeParcelas, dataHoje)
    preencherDados(anosTotais)
}


function checagemDados() {
    if (inputNome.value.length < 5) {
        alert("O nome do cliente deve conter no mínimo 5 caracteres.")
        return false
    }

    // if (inputDataNascimento.value.length < 8) {
    //         alert("O DataNascimento do cliente deve ser selecionada.")
    //         return
    //     }

    if (inputCPF.value.length < 11) {
        alert("O CPF deve conter exatamente 11 dígitos numéricos")
        return false
    }
    if (inputEmprestimo.value <= 0) {
        alert(inputEmprestimo.value)
        alert("O valor do emprestimo tem que ser maior que zero")
        return false
    }
    if (inputTaxaJurosSimples.value <= 0) {
        alert(inputEmprestimo.value)
        alert("O valor da taxa de juros tem que ser maior que zero")
        return false
    }
}

function calcularDados(nome, dataNascimento, CPF, Emprestimo, TaxaJurosSimples, QuantidadeParcelas, dataHoje) {

    // alert(dataNascimento)
    // tem que ser igual a chave
    let { ano: anoNascimento, mes: mesNascimento, dia: diaNascimento } = separarData(dataNascimento)
    // alert(anoNascimento)
    // alert(mesNascimento)
    // alert(diaNascimento)

    let { ano: anoHoje, mes: mesHoje, dia: diaHoje } = separarData(dataHoje)
    //  alert(anoHoje)
    //  alert(mesHoje)
    //  alert(diaHoje)


    let diasDiferenca = diaHoje - diaNascimento
    let mesesDiferenca = (mesHoje * 30) - (mesNascimento * 30)
    let anosDiferenca = (anoHoje - anoNascimento) * 365
    let diasTotais = diasDiferenca + mesesDiferenca + anosDiferenca


    // alert(diasDiferenca)
    // alert(mesesDiferenca)
    // alert(anosDiferenca)

    // alert(diasTotais)
    let anosTotais = (diasTotais / 365).toFixed(1)
    alert(anosTotais)


    // for (let i = 0; i < dataNascimento.length; i++) {
    //     alert(dataNascimento[i] + " " + i)

    // }
    return { anosTotais }
}

function separarData(data) {
    let ano = Number(data[0] + data[1] + data[2] + data[3])
    let mes = Number(data[5] + data[6])
    let dia = Number(data[8] + data[9])

    // alert(ano)
    // alert(mes)
    // alert(dia)
    return { ano, mes, dia }
}

function preencherDados(anosTotais) {
    resultBox.innerHTML = `<h3>Resumo da Simulação</h3>
        <p><strong>Idade Calculada:</strong> <span id="resAge"></span>${anosTotais} anos</p>
        <p><strong>Montante Total com Juros:</strong> R$ <span id="resTotalAmount"></span></p>



        <button class="btn btn-danger" id="btnReset" style="margin-top: 20px;">Nova Simulação</button>`
}