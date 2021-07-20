import Game from "./game.js";
import GameView from "./game-view.js";

let game = new Game('Osama1','Osama2');
    
let gameView = new GameView(document.getElementById('app'));

//define view functions

gameView.onTileClick = function (index) {
    game.makeMove(index);
    gameView.update(game);
}


gameView.onRestartClick = function () {
    game = new Game('Osama1','Osama2');
    gameView.update(game);
}

gameView.update(game);
