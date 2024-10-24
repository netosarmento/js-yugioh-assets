const state = {    // criando constante state que sao estados em formas de objeto pra manipular, estados de memoria (caracteristicas) 
  score:{     // criando estado score para mudar no html
      playerScore: 0,
      computerScore: 0,
      boxScore: document.getElementById("score_points"),
  },

  cardSprites:{   // criando um estado para mudar com javascript as imagens
      avatar: document.getElementById("card-image"), // identificando onde botar a imagen pelo id no html
      name: document.getElementById("card-name"), 
      type: document.getElementById("card-type"), 
  },
  
  playerSides: {    // função para identificar os lados no htlml usando os ID's
    player1: "player-cards",  // pegando o id e associando a funçao
    player1BOX: document.querySelector(".card-box.framed#player-cards"),
    computer: "computer-cards",
    computerBOX: document.querySelector(".card-box.framed#computer-cards"),
  },

  fieldCards:{  // trocando as cartas no jogo
      player: document.getElementById("player-field-card"),
      computer: document.getElementById("computer-field-card"),
  },
  button: document.getElementById("next-duel"),  // como é só um botao assim é o suficiente
};
/*  foi jogado pra dentro do state tambem */
const playerSides = {    // função para identificar os lados no htlml usando os ID's
    player1: "player-cards",  // pegando o id e associando a funçao
    computer: "computer-cards",
} 

const pathImages = "src/assets/icons/"; // transformando o caminho numa variavel pra facilitar minha life

const cardData = [
    {
     id: 0, // criando o objeto
     name: "Blue eyes White Drangon",
     type: "Paper",
     img: `${pathImages}dragon.png`,
     winOf: [1],
     loseOf: [2],
    },
    {
     id: 1, // criando outro objeto
     name: "Dark Magician",
     type: "Rock",
     img: `${pathImages}magician.png`,
     winOf: [2],
     loseOf: [0],
    },
    {
     id: 2, // criando outro objeto
     name: "Exodia",
     type: "Scissors",
     img: `${pathImages}exodia.png`,
     winOf: [0],
     loseOf: [1],
    },   
]

async function getRandomCardId() { // sem parametro porque ela vai só randomizar as cartas
    const randomIndex = Math.floor(Math.random() * cardData.length); // usando metodo math floor para ser um numero inteiro, e metodo random para randomizar * escolhe o limite cardata dentro do seu tamanho, ainda vou escolher o atributo que usarei como parametro
       return cardData[randomIndex].id;  // o meu cardata vai retornar com randomindex, que pega o atributo id
}

async function createCardImage(IdCard, fieldSide) {    // criando função pra criar a imagem e destribuir random no lado de cada campo
    const cardImage = document.createElement("img");  // criando o elemento imagem
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "src/assets/icons/card-back.png"); // botando o source dinamicamente
    cardImage.setAttribute("data-id", IdCard);   // data permiti criar atributos dinamicos no html, poderia escolher qualquer um, mas quero guardar o id ali caso seja necessario
    cardImage.classList.add("card"); // criando a classe card dinamicamente 

    if (fieldSide === playerSides.player1) {  // se o fieldside for o playersides do player1
        cardImage.addEventListener("click", () => {  // se o card for clicado ele vai
             setCardsField(cardImage.getAttribute("data-id"));   // vou setar cartas em campo, a cartar com id que eu apertar
        });

        cardImage.addEventListener("mouseover", () => {   // se eu passar o mouse em cima do cardimage
            drawSelectCard(IdCard);   // vai desenhar o a carta com esse id 
    });
    }

    

    return cardImage;
}

async function setCardsField(IdCard) {
    
    await removeAllCardsImage();
    
    let computerCardId = await getRandomCardId();

    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    state.fieldCards.player.src = cardData[IdCard].img; // to passando meu source da imagem como carddata o id
    state.fieldCards.computer.src = cardData[computerCardId].img;

    let duelResults = await checkDuelResults(IdCard, computerCardId); // verificando quem ganhou com funcao checkduel 

    await updateScore(); // mostrar o resultado no score
    await drawButton(duelResults); // botao mostrando o resultado
}


async function removeAllCardsImage() {
    let { computerBOX, player1BOX } = state.playerSides; // selecionando a classe e id que quero
    let imgElements = computerBOX.querySelector(("img")); // selecionando a tag img
    imgElements.forEach((img) => img.remove()); //tirando as imagens

    imgElements = player1BOX.querySelector(("img"));
    imgElements.forEach((img) => img.remove());
}

async function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerHTML = cardData[index].name;
    state.cardSprites.type.innerHTML = "Atributte:" + cardData[index].type;    
}

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        
        const cardImage = await createCardImage(randomIdCard, fieldSide); // pegando o card aleatorio e jogando de um lado
        
        document.getElementById(fieldSide).appendChild(cardImage); // mostrando dos dois lados as imagens de cards
    }
}

function init () {
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);
}

init();