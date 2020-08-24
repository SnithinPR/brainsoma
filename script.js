const maxScore = 100;
const main = document.querySelector('main');
const body = document.querySelector('body');
const blockSize = getComputedStyle(body).getPropertyValue('--block-size');
const borderSize = getComputedStyle(body).getPropertyValue('--border-size');
let blocks = [];

function startGame(size) {
  const score = new Score(size, maxScore);
  const game = new Game(size, main);
  game.createGrid(blockSize, borderSize);
  game.createDivs();
  blocks = [];
  game.divs.forEach((div, index) => {
    const obj = new Block({index, size, div, currentNum:game.getCurrentNum()});
    obj.addSwapEvent(div, blocks, score, game.winningNums);
    blocks.push(obj);
  });
}

function selectGameSize(elem) {
  let size = 2;
  if (elem) {
    const index = elem.selectedIndex;
    size = elem.options[index].value;
  }
  startGame(size);
}

selectGameSize();