let blocks;
let score;
const scoreFactor = 150;
const main = document.querySelector('main');
const body = document.querySelector('body');
const gameSize = document.querySelector('#game-size');
const helpDisplay = document.querySelector('.help');
const shuffleDisplay = document.querySelector('.shuffle-display');
const blockSize = getComputedStyle(body).getPropertyValue('--block-size');
const borderSize = getComputedStyle(body).getPropertyValue('--border-size');

function startGame() {
  if (!shuffleDisplay.classList.contains('hide')) return;
  const size = gameSize.value;
  score = new Score(size, scoreFactor);
  const game = new Game(size, main);
  game.createGrid(blockSize, borderSize);
  game.createDivs();
  blocks = [];
  game.divs.forEach((div, index) => {
    const block = new Block({index, size, div, currentNum:index + 1});
    block.addSwapEvent(div, blocks, score, game);
    blocks.push(block);
  });
  const shuffleLength = (scoreFactor/5) * Math.pow(size, 3);
  game.shuffle(blocks, gameSize, shuffleDisplay, shuffleLength)
}

function toggleHelp(state) {
  helpDisplay.classList[state]('show');
}

startGame();