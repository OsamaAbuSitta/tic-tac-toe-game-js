import Game from "./game.js";
import GameView from "./game-view.js";

let game = new Game();
let gameView = new GameView(document.getElementById('app'));

//define view functions

gameView.onTileClick = function (index) {
    game.makeMove(index);
    gameView.update(game);
}


gameView.onRestartClick = function () {
    game = new Game();
    gameView.update(game);
}

gameView.update(game);
