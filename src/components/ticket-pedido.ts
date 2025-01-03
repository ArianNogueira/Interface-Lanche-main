let card = [];

const container = document.getElementById("container")
const cardIntemsContainer = document.getElementById("extrato-ticket");
const cartTotal = document.getElementById("card-total");
const selectBarbecues = document.querySelectorAll('input[name="barbecue"]') as NodeListOf<HTMLInputElement>;
const selectfriedPastrys = document.querySelectorAll('input[name="fried-pastry"]') as NodeListOf<HTMLInputElement>;
const extratoPedido = document.getElementById("extrato-pedido_div")
const mensagemExtrato = document.getElementById("mensagem-extrato")

container.addEventListener("click", function (evento) {
  const target = evento.target as HTMLElement;
  let adiconarItem = target.closest(".adicionar-item");

  if (adiconarItem) {
    abrirExtratoPedido(true)
  }

  if (adiconarItem) {
    const nome: string = adiconarItem.getAttribute("data-name");
    const valor: string = parseFloat(adiconarItem.getAttribute("data-price")).toFixed(2);
    const src: string = adiconarItem.getAttribute("data-caminho");

    addCard(nome, valor, src)
  }
})

function abrirExtratoPedido(ativo: boolean) {
  if (ativo === true) {
    extratoPedido.style.display = "block"
    mensagemExtrato.style.display = "none"
    updateCardMOdal()
  } else {
    extratoPedido.style.display = "none"
    mensagemExtrato.style.display = "block"
    updateCardMOdal()
  }

}

function addCard(nome: string, valor: string, src: string) {
  // if (nome === "Caldo de Ovos") {
  //     nome = functionSelectPriceBroth();
  //     if(nome === null) {
  //         nullCase("do Caldo de Ovos")
  //         return;
  //     } else {
  //         const formatted = nome.split(' ')
  //         const selectPrice = parseFloat(formatted[3]).toFixed(2)
  //         valor = selectPrice;
  //     }
  // }

  if (nome === "Churrasco") {
    nome = functionSelectBarbecue()
    if (nome === null) {
      alert("É necessário escolher uma opção!")
      abrirExtratoPedido(false)
      return;
    }
  }

  if (nome === "Pastel") {
    nome = functionSelectfriedPastry();
    if (nome === null) {
      alert("É necessário escolher uma opção!")
      abrirExtratoPedido(false)
      return;
    }
  }

  // if (nome === "Batata Frita") {
  //     nome = getFriesValue();
  //     if (nome === null) {
  //         nullCase("da Batata Frita")
  //         return
  //     } else {
  //         const formatted = nome.split(' ');
  //         const selectPrice = parseFloat(formatted[4]).toFixed(2)
  //         valor = selectPrice;
  //     }
  // }

  function functionSelectBarbecue() {
    let selectValue = null
    selectBarbecues.forEach(selectBarbecue => {
      if (selectBarbecue.checked) {
        selectValue = selectBarbecue.value;
        selectBarbecue.checked = false
      }

    })
    return selectValue;
  }

  function functionSelectfriedPastry() {
    let selectValue = null
    selectfriedPastrys.forEach(selectfriedPastry => {
      if (selectfriedPastry.checked) {
        selectValue = selectfriedPastry.value;
        selectfriedPastry.checked = false
      }
    })
    return selectValue;
  }

  const existingITem = card.find(item => item.nome === nome);
  if (existingITem) {
    existingITem.quantidade += 1;
  } else {
    card.push({
      src,
      nome,
      valor,
      quantidade: 1,
      // observation
    })
  }
  updateCardMOdal();
}

function updateCardMOdal() {
  cardIntemsContainer.innerHTML = "";
  let total = 0

  card.forEach((item) => {
    const carItemElement = document.createElement("div")

    // Criação do item selecionado
    carItemElement.innerHTML = `
            <div class="w-full">
                <div class="flex flex-col gap-y-2">
                    <div class="flex justify-between">
                        <p class="text-lg font-bold">${item.nome}</p>
                        <button class="remove-from-cart-btn" data-nome="${item.nome}"> 
                          X 
                        </button>
                    </div>
                    <div class="flex justify-between mb-2">
                        <p>
                            Quantidade: 
                            <button class="bg-[#926e56] min-w-7 px-2 rounded-sm less-btn">-</button>
                            ${item.quantidade}
                            <button class="bg-[#926e56] min-w-7 px-2 rounded-sm more-btn">+</button>
                        </p>
                        <p>R$ ${item.valor}</p>
                    </div>
                </div>
                <hr class="border-[#926e56] border-x-1 mb-3">
            </div>
      `

    const lessBtn = carItemElement.querySelector(".less-btn");
    const moreBtn = carItemElement.querySelector(".more-btn");

    lessBtn.addEventListener("click", function () {
      // verifica se o item for menor que 1 e excluir do carrinho, do contránio apenas diminue a quantidade
      if (item.quantidade <= 1) {
        carItemElement.remove();
        abrirExtratoPedido(false)
        const index = card.indexOf(item);
        if (index > -1) {
          card.splice(index, 1);
        }
      }
      item.quantidade--;
      updateCardMOdal()
    })

    // aumenta a quantidade do carrinho
    moreBtn.addEventListener("click", function () {
      item.quantidade++
      updateCardMOdal()
    })

    total += item.valor * item.quantidade;
    cardIntemsContainer.appendChild(carItemElement);
  })
  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

cardIntemsContainer.addEventListener("click", function (evento) {
  updateCardMOdal();

  // verifica se a classe atribuida ao botão e armazena o atributo do nome do alimento
  const target = evento.target as HTMLElement
  if (target.classList.contains("remove-from-cart-btn")) {
    const nome = target.getAttribute("data-nome")
    removeItemCart(nome);
  }
})

// Função para remover 
function removeItemCart(nome: string) {
  const index = card.findIndex(item => item.nome === nome)

  if (index !== -1) {
    card.splice(index, 1);
    updateCardMOdal();
  }
  verificaQuantidade()
}

function verificaQuantidade() {
  if (card.length < 1) {
    abrirExtratoPedido(false)
    updateCardMOdal()
  }
}
