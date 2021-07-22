export default class GameAgent {

    constructor(game, gameView) {
        this.gameStatusShadow = {};
        this.game = game;
        this.gameView = gameView;

        Object.assign(this.gameStatusShadow, game);
    }

    play() {
        let bestMove = this.bestMove();

        if (!(bestMove >= 0)) return;

        this.game.makeMove(bestMove);
        this.gameView.update(this.game);
    }


    bestMove() {
        let available = this.game.board.map((p, index) => { return { value: p, index: index } })
            .filter(p => !p.value);

        if (!available || !available.length) return;
        available = available.map(a => a.index);
        let move = available[0];
        let bestScore = -1;
        for(let index of available){
            this.gameStatusShadow.board[index] = 'O';
            let score = this.miniMax(this.gameStatusShadow, false);
            this.gameStatusShadow.board[index] = null;
            if(score > bestScore) {
                move = index;
            }
        }
        

        return move;
    }


    miniMax(gameStatusShadow, isMaximizing) {
        if (gameStatusShadow.findWinningCombination())
            return isMaximizing ? -1 : 1;

        let available = gameStatusShadow.board.map((p, index) => { return { value: p, index: index } })
            .filter(p => !p.value);

        if (!available || !available.length) {
            return 0;
        }

        available = available.map(a => a.index);

        if(isMaximizing){

            let bestScore =  -Infinity;
            
            for (let index of available) {
                gameStatusShadow.board[index] = 'O';
                let score = this.miniMax(gameStatusShadow, false);
                gameStatusShadow.board[index] = null;
                bestScore =Math.max(score, bestScore);
            }
    
            return bestScore;

        }else{
            let bestScore = Infinity;
            
            for (let index of available) {
                gameStatusShadow.board[index] ='X';
                let score = this.miniMax(gameStatusShadow, true);
                gameStatusShadow.board[index] = null;
                bestScore = Math.min(score, bestScore);
            }
    
            return bestScore;
        }
        
    }

}