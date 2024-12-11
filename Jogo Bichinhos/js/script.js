import Leveis from "./data/scriptConstructDataLeveis.js";
import Animais from "./data/scriptConstructDataAnimais.js";
import { startTimer, GameData, imgQuantidade } from "/js/jogoStart.js";

var canStart = true;
export var level = 0;

const Info = document.getElementById("INFO");
const Fim = document.getElementById("FIM");
const btt = document.getElementById("startBtt");
const img = document.getElementById("fotoAnimal");
const nome = document.getElementById("nome");
const levelText = document.getElementById("level");
const acertoBtt = document.getElementById("closeWindon");
export const acertoText = document.getElementById("Acerto");

btt.addEventListener("click", () => (canStart ? StartGame(level) : null));
acertoBtt.addEventListener("click", () => acertoFecha());

setInfo();

function setInfo() {
  GameData.ImgObjetoCorreto = Math.floor(Math.random() * imgQuantidade);
  img.src = Animais[GameData.ImgObjetoCorreto].imgPath;
  img.alt = Animais[GameData.ImgObjetoCorreto].nome;
  nome.innerText = Animais[GameData.ImgObjetoCorreto].nome;
  levelText.innerText = `Level: ${level + 1}`;
}

function StartGame(index) {
  // console.log("start");
  canStart = false;
  Info.style.visibility = "hidden";
  Fim.style.visibility = "hidden";
  startTimer(
    Leveis[index].vel,
    Leveis[index].linhas,
    Leveis[index].objL,
    Leveis[index].imgT
  );
}

export function EndGame() {
  setInfo();
  level++;
  if (level < Leveis.length) {
    // console.log("passou")
    canStart = true;
    levelText.innerText = `Level: ${(level + 1)}`;
  } else {
    Info.innerText = "Parábens! Você completou todos os leveis!";
  }
  Info.style.visibility = "visible";
  Fim.style.visibility = "visible";
}

function acertoFecha() {
  Fim.style.visibility = "hidden";
}

// Simples tamanho de tela
const Jogo = document.getElementById("Jogo");
Jogo.style.width = `80%`;
Jogo.style.height = `80%`;
