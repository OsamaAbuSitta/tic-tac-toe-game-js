export default class Game {

    constructor(player1, player2) {
        this.player1 = player1 || "X";
        this.player2 = player2 || "O";
        this.gameModes = ['Single player', 'Two players'];
        this.gameMode = 0;
        this.currentPlayer = this.player1;
        this.turn = "X";
        this.board = new Array(9).fill(null);
    }

    nextTurn() {
        this.turn = this.turn == 'X' ? 'O' : 'X';
        this.currentPlayer = this.turn == 'X' ? this.player1 : this.player2;
    }

    makeMove(i) {
        if (!this.isInProgress())
            return


        if (this.board[i])
            return;

        this.board[i] = this.turn;

        if (this.findWinningCombination())
            return;


        this.nextTurn();

        if (this.gameMode == 0 && this.turn == 'O'){

            this.play();
        }


    }

    findWinningCombination() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;

            if (this.board[a] && (this.board[a] === this.board[b] && this.board[a] === this.board[c])) {
                return combination;
            }
        }

        return null;
    }

    isInProgress() {
        return !this.findWinningCombination() && this.board.includes(null);
    }

    play() {
        let bestMove = this.bestMove();
        this.board[bestMove] = 'O';
        this.makeMove(bestMove);
    }

    bestMove() {
        let available = this.board.map((p, index) => { return { value: p, index: index } })
            .filter(p => !p.value);
        let random = Math.floor(Math.random() * available.length);
        let move = available[random].index;
        return move;
    }


}