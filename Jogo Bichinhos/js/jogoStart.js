import Animais from "./data/scriptConstructDataAnimais.js";
import { EndGame, level, acertoText } from "./script.js";
// import GameData from './data/scriptData.js'

// Const's de referencia para os elementos principais
const Start = document.getElementById("START");
const Objetos = [];
const ObjetosInfo = [];
export const imgQuantidade = Animais.length - 1;

export const GameData = {
  imgSize: 0, // % do Tamanho da imagem
  velocidadeObjeto: 0, // Velocidade dos objetos
  linhas: 0, // Linhas de objetos do jogo
  objetoLinha: 0, // Objetos por linha
  //itensTotais = linhas * objetoLinha

  ObjetoWidth: 0, // Largura do Objeto
  ObjetoHeight: 0, // Altura do Objeto

  objetoCorreto: 0, // Id do Objeto Correto
  ImgObjetoCorreto: 0 // Id da Imagem do Objeto Correto
};

function setGameData(vel, linha, objLinhas, imgS) {
  GameData.velocidadeObjeto = vel;
  GameData.linhas = linha;
  GameData.objetoLinha = objLinhas;
  GameData.imgSize = imgS;

  // Constantes de configuração de movimento
  GameData.ObjetoWidth = 100 / GameData.objetoLinha;
  GameData.ObjetoHeight = 100 / GameData.linhas;
  // console.log(GameData.ObjetoWidth);
  // console.log(GameData.ObjetoHeight);

  // Declara o valor de qual objeto é o correto
  GameData.objetoCorreto = 1 + Math.floor(Math.random() * (GameData.linhas * GameData.objetoLinha - 1));
  // console.log(GameData.objetoCorreto);
  // GameData.ImgObjetoCorreto = Math.floor(Math.random() * imgQuantidade);
  // console.log(GameData.ImgObjetoCorreto);
}

// Loop para adicionar objetos
function AddObjetos() {
  for (let index = 0; index < GameData.linhas * GameData.objetoLinha; index++) {
    const objeto = document.createElement("div");

    const objetoinfo = {
      direcao: Math.floor(index / GameData.objetoLinha) % 2 == 0 ? -1 : 1,
    };
    // console.log("Objeto" + (index + 1) + ": " + objetoinfo.direcao);

    inicializaObjeto(objeto, index);

    Start.appendChild(objeto);

    const img = document.createElement("div");

    img.classList.add("img");

    img.style.height = `${GameData.imgSize}%`;
    img.style.width = `${GameData.imgSize}%`;
    img.style.backgroundSize = "200%";

    // console.log(Animais[0].nome)
    // console.log(Animais[0].desc)
    // console.log(Animais[0].imgPath)
    if (index + 1 == GameData.objetoCorreto) {
      img.style.background = `url(${Animais[GameData.ImgObjetoCorreto].imgPath})`;
      // console.log(Animais[GameData.ImgObjetoCorreto].imgPath)
    } else {
      let i = Math.floor(Math.random() * (imgQuantidade));
      while (i == GameData.ImgObjetoCorreto) {
        i = Math.floor(Math.random() * (imgQuantidade));
        // console.log("try");
      }
      img.style.background = `url(${Animais[i].imgPath})`;
    }

    objeto.appendChild(img);

    // console.log(objeto);
    Objetos.push(objeto);
    ObjetosInfo.push(objetoinfo);
  }
  // Start.children[objetoCorreto-1].children[0].style.background = "green"; // Show Correct
}

// Função para modificar o visual dos objetos
function inicializaObjeto(objeto, index) {
  objeto.classList.add(`objeto`);
  objeto.classList.add(`id${index + 1}`);
  objeto.style.width = `${GameData.ObjetoWidth}%`;
  objeto.style.height = `${GameData.ObjetoHeight}%`;

  // Dev view
  // objeto.style.backgroundColor = "lightblue";
  // objeto.style.border = "1px solid black";
  // objeto.textContent = `Item ${index + 1}`;

  // Posicionamento inicial
  objeto.style.left = `${
    -(GameData.ObjetoWidth / 4) +
    (index % GameData.objetoLinha) *
      GameData.ObjetoWidth *
      (1 + 0.5 / (GameData.objetoLinha - 1))
  }%`;

  // console.log(objeto.style.left);
  objeto.style.top = `${
    (Math.floor(index / GameData.objetoLinha) % GameData.linhas) *
    GameData.ObjetoHeight
  }%`;

  // Listener do click
  objeto.addEventListener("click", () => {
    if (objeto.classList.contains(`id${GameData.objetoCorreto}`)) {
      acertoText.innerHTML = "Ótimo! Era esse animal mesmo!";
      // alert("Você encontrou o objeto correto!!!!!");
      endTimer();
    } else {
      acertoText.innerHTML = "Ops, não era esse não, mas tudo bem!";
      // alert(`Você clicou no errado T-T`);
      endTimer();
    }
  });
}

function remObjetos() {
  for (let index = Objetos.length - 1; index >= 0; index--) {
    // console.log(Objetos[index]);
    Objetos[index].remove();
    Objetos.pop;
  }
}

let time = 0;
var rotation = 0;
// Função para mover os objetos
function moveObjects() {
  rotation = Math.sin(time) * 3;
  Objetos.forEach((objeto, index) => {
    objeto.children[0].style.transform = `rotate(${rotation}deg)`;
    const direcao = ObjetosInfo[index].direcao;
    const currentLeft = parseFloat(objeto.style.left);
    let currentTop = parseFloat(objeto.style.top);

    objeto.style.left = `${
      currentLeft +
      (direcao * GameData.velocidadeObjeto) / GameData.objetoLinha / 100
    }%`;

    let change =
      direcao == 1
        ? currentLeft >= 100
          ? true
          : false
        : currentLeft <= -GameData.ObjetoWidth
        ? true
        : false;

    if (change) {
      objeto.style.top = `${currentTop - GameData.ObjetoHeight}%`;
      currentTop = parseFloat(objeto.style.top);
      if (GameData.linhas % 2 == 1 && currentTop < -1) {
        objeto.style.left = "100%";
      } else {
        ObjetosInfo[index].direcao *= -1;
      }
    }

    objeto.style.transform = `scaleX(${-direcao})`;

    currentTop = parseFloat(objeto.style.top);
    if (currentTop < -1) {
      objeto.style.top = `${
        (Math.floor(
          (Math.floor(GameData.objetoLinha * GameData.linhas) - 1) /
            GameData.objetoLinha
        ) %
          GameData.linhas) *
        GameData.ObjetoHeight
      }%`;
    }
  });
  time += parseInt(Jogo.style.width) / 1000 / 4;
}

var Time = undefined;
var TimeStart = [level];
var TimeEnd = [level];

export function startTimer(vel, linhas, objPorLinha, imgSize) {
  setGameData(vel, linhas, objPorLinha, imgSize);
  AddObjetos();
  TimeStart[level] = new Date().toLocaleTimeString();
  //
  Time = setInterval(moveObjects, 1);
}

function endTimer() {
  TimeEnd[level] = new Date().toLocaleTimeString();
  EndGame();
  remObjetos();
  clearInterval(Time);
}
