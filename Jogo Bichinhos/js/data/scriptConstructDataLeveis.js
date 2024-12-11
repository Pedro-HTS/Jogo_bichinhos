const Velocidades = [
  20, 20, 22, 22, 24, 24, 26, 26, 28, 30
];

const QtLinhas = [ // Quantidade de linhas
  2, 2, 2, 3, 3, 3, 4, 4, 4, 5
];

const ObjLinhas = [ // Objeto por linha
  2, 2, 3, 3, 4, 4, 5, 5, 6, 6
];

const ImgTamanhos = [ // É %
  80, 75, 70, 65, 60, 55, 50, 45, 40, 35
];

const Leveis = Velocidades.map((x, id) => {
  return { vel: x, linhas: QtLinhas[id], objL: ObjLinhas[id], imgT: ImgTamanhos[id]};
});

// console.log(Leveis);

export default Leveis;