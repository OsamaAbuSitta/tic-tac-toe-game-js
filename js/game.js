export default class Game {

    constructor(player1, player2) {
        this.player1 = player1 || "X";
        this.player2 = player2 || "O";
        this.gameModes = ['Single player', 'Two players'];
        this.gameMode = 0;
        this.currentPlayer = this.player1;
        this.turn = "X";
        this.board = new Array(9).fill(null);
        this.findWinningCombination = this.innerFindWinningCombination;
    }

    nextTurn() {
        this.turn = this.turn == 'X' ? 'O' : 'X';
        this.currentPlayer = this.turn == 'X' ? this.player1 : this.player2;
    }

    makeMove(i) {
        if (!this.isInProgress())
            return false;


        if (this.board[i])
            return false;

        this.board[i] = this.turn;

        if (this.findWinningCombination())
            return false;


        this.nextTurn();

        return true;
    }

   innerFindWinningCombination() {
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

}