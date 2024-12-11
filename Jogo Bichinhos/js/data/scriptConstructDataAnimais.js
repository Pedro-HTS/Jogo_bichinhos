const AnimaisNomes = [
  "Cachorrinho", "Pintinhinho", "Ursinho", 
  "Ratinho", "Hamsterzinho", "Galinho", 
  "Tigrinho", "Koalinha", "Preguiçinha", 
  "Elefantinho", "Guaxininho", "Porquinho", 
  "Pandinha", "Raposinha"
];

const AnimaisDesc = [
  "É um: ",
  "É um: ",
  "É um: ",
  "É um: ",
  "É um: ",
  "É um: ",
  "É um: ",
  "É um: ",
  "É um: ",
  "É um: ",
  "É um: ",
  "É um: ",
  "É um: ",
  "É um: "
];

const Animais = AnimaisNomes.map((x, id) => {
  return { nome: x, desc: (AnimaisDesc[id] + x), imgPath:`./imgs/bichinhos/img${id+1}.png` };
});

export default Animais;