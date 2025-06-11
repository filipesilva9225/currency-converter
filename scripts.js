const form = document.getElementById("converterForm");
const btn = document.getElementById("converter-btn");
const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const convertedAmount = document.getElementById("convertedAmount");
const toCurrency = document.getElementById("toCurrency");
const loading = document.querySelector(".loading");
const result = document.querySelector(".result");
const error = document.querySelector(".error");

const API_URL = "https://api.exchangerate-api.com/v4/latest/";

/*FUNÇÃO ASSINCRONA = Uma função que pode demorar
para ser exucatada, mas não impedirá que o 
restante do codígo sejá executado(exemplo: ela é um garçom, 
que atende outras mesas enquanto seu pedido está sendo 
preparado para ser entregue*/
async function convertMoney() {
  loading.style.display = "block";
  error.style.display = "none";
  result.style.display = "none";

  /*Try(tentará algo, caso não funcione, entra no 
  catch independentemente)*/
  try {
    /*awiat (Avisa para que o javascrip espere o servidor 
      responder) fetch(função para acessar servidores)*/
    const response = await fetch(API_URL + fromCurrency.value);

    /*Json: traz informações em formato de pares (Chave : "valor")
    facilitando a comunicação de duas partes do mesmo sistema*/
    const data = await response.json();

    /*rates: filtram as informações para exibir apenas o que for chamado*/
    const rate = data.rates[toCurrency.value];

    const convertedValue = (amount.value * rate).toFixed(2);

    convertedAmount.value = convertedValue;
    result.style.display = "block";

    /*innerHTML: permite que insera codigos HTML em uma div vazia */
    result.innerHTML = `
      <div style="font-size: 1.4rem;"> 
        ${amount.value} ${fromCurrency.value} = ${convertedAmount.value} ${toCurrency.value}
      </div>

     <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 10px">
      Taxa: 1 ${fromCurrency.value} = ${rate} ${toCurrency.value}
      </div>
    `;
  } catch (err) {
    console.error(err);
    error.style.display = "block";
    error.innerHTML = `Falha ao converter moeda! Tente novamente!`;
  }

  loading.style.display = "none";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  convertMoney();
});
