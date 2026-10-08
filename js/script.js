let inputNome = document.querySelector(`#clientName`)
let inputDataNascimento = document.querySelector(`#birthDate`)
let inputDataHoje = document.querySelector(`#dataHoje`)
let inputCPF = document.querySelector(`#clientCPF`)
let inputEmprestimo = document.querySelector(`#loanAmount`)
let inputTaxaJurosSimples = document.querySelector(`#interestRate`)
let inputQuantidadeParcelas = document.querySelector(`#installments`)

let resultBox = document.querySelector(`#resultBox`)

function coletaDados() {
    let nome = inputNome.value
    let dataNascimento = inputDataNascimento.value
    let dataHoje = inputDataHoje.value
    let CPF = inputCPF.value
    let Emprestimo = Number(inputEmprestimo.value)
    let TaxaJurosSimples = Number(inputTaxaJurosSimples.value)
    let QuantidadeParcelas = Number(inputQuantidadeParcelas.value)

    if (checagemDados() == false) {
        return
    }

    if (dataHoje.length != 10) {
        alert(`Data de hoje nao selecionada.`)
        return
    }

    let { anosTotais } = calcularDados(nome, dataNascimento, CPF, Emprestimo, TaxaJurosSimples, QuantidadeParcelas, dataHoje)

    let { montanteTotal, valorParcela } = calcularDinheiro(Emprestimo, TaxaJurosSimples, QuantidadeParcelas)

    preencherDados(anosTotais, QuantidadeParcelas, valorParcela, montanteTotal, dataHoje)
}


function checagemDados() {
    if (inputNome.value.length < 5) {
        alert("O nome do cliente deve conter no mínimo 5 caracteres.")
        return false
    }

    if (inputDataNascimento.value.length < 8) {
            alert("O Data Nascimento do cliente deve ser selecionada.")
            return
        }

    if (inputCPF.value.length < 11) {
        alert("O CPF deve conter exatamente 11 dígitos numéricos")
        return false
    }
    if (inputEmprestimo.value <= 0) {
        alert("O valor do emprestimo tem que ser maior que zero")
        return false
    }
    if (inputTaxaJurosSimples.value <= 0) {
        alert("O valor da taxa de juros tem que ser maior que zero")
        return false
    }
     if (inputQuantidadeParcelas.value <= 0) {
        alert("O valor da quantida de Parcelas tem que ser maior que zero")
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
    let { anosTotais } = calcularAnosTotais(anoNascimento, mesNascimento, diaNascimento, anoHoje, mesHoje, diaHoje)

    // alert(anosTotais)


    // for (let i = 0; i < dataNascimento.length; i++) {
    //     alert(dataNascimento[i] + " " + i)

    // }
    return { anosTotais }
}

function calcularAnosTotais(anoNascimento, mesNascimento, diaNascimento, anoHoje, mesHoje, diaHoje) {
    let diasDiferenca = diaHoje - diaNascimento
    let mesesDiferenca = (mesHoje * 30) - (mesNascimento * 30)
    let anosDiferenca = (anoHoje - anoNascimento) * 365
    let diasTotais = diasDiferenca + mesesDiferenca + anosDiferenca


    // alert(diasDiferenca)
    // alert(mesesDiferenca)
    // alert(anosDiferenca)

    // alert(diasTotais)
    let anosTotais = (diasTotais / 365).toFixed(1)
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

function calcularDinheiro(Emprestimo, TaxaJurosSimples, QuantidadeParcelas) {

    let montanteTotal = (Emprestimo + (Emprestimo * TaxaJurosSimples / 100)).toFixed(2)
    let valorParcela = Number((montanteTotal / QuantidadeParcelas).toFixed(2))
    //  alert(Emprestimo+ " " +TaxaJurosSimples + " " + montanteTotal +" "+ QuantidadeParcelas)
    // alert(`Valor da Parcela ${1}: ${valorParcela}, data de vencimento:${30*1}`)
    return { montanteTotal, valorParcela }
}

function organizarData(data) {
    let { ano, mes, dia } = separarData(data)

    if ((dia.toString()).length < 2) {
        // alert(dia.toString())
        dia = "0" + dia
    }
    if ((mes.toString()).length < 2) {
        // alert(dia.toString())
        mes = "0" + mes
    }
    let dataOrganizada = `${dia}-${mes}-${ano}`
    // alert(dataOrganizada)
    return { dataOrganizada }
}

function preencherDados(anosTotais, QuantidadeParcelas, valorParcela, montanteTotal, dataHoje) {
    let { dataOrganizada: dataHojeOrganizada } = organizarData(dataHoje)
    // alert(dataHojeOrganizada)
    let listaHtml = `<table>
                <tr>
                    <th>parcela</th>
                    <th>Valor da Parcela</th>
                    <th>data de vencimento</th>
                </tr>`
    for (let i = 0; i < QuantidadeParcelas; i++) {
        listaHtml += `<tr>
                    <td>${i + 1}</td>
                    <td>R$${valorParcela}</td>
                    <td>${30 * (i + 1)} dias apos ${dataHojeOrganizada}</td>`
    }
    listaHtml += `</table>`
    resultBox.innerHTML = ""
    resultBox.innerHTML += listaHtml
    resultBox.innerHTML += `<h3>Resumo da Simulação</h3>
        <p><strong>Idade Calculada:</strong> <span id="resAge"></span>${anosTotais} anos</p>
        <p><strong>Montante Total com Juros:</strong> R$${montanteTotal} <span id="resTotalAmount"></span></p>



        <button class="btn btn-danger" id="btnReset" style="margin-top: 20px;">Nova Simulação</button>`
}