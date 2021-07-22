import Game from "./game.js";
import GameView from "./game-view.js";
import GameAgent from "./game-agent.js";

let game = new Game('Osama1','Osama2');
let gameView = new GameView(document.getElementById('app'));
let gameAgent  = new GameAgent(game,gameView);
//define view functions

gameView.onTileClick = function (index) {
    game.makeMove(index);
    gameView.update(game);
    if(game.gameMode == 0){
        gameAgent.play();
    }
}


gameView.onRestartClick = function () {
    game = new Game('Osama1','Osama2');
    gameView.update(game);
    gameAgent  = new GameAgent(game,gameView)
}

gameView.update(game);
