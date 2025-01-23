let currentPlayer: "X" | "O" = "X"
let gameBoard: ("X" | "O" | "")[] = Array(9).fill("")
let gameActive = true

const board = document.getElementById("board") as HTMLDivElement
const status = document.getElementById("status") as HTMLParagraphElement

function cellClick(index: number): void {
  if (gameBoard[index] !== "" || !gameActive) return
  gameBoard[index] = currentPlayer
  updateBoard()
  if (checkWin()) {
    status.textContent = `${currentPlayer} WIN`
    gameActive = false
  } else if (gameBoard.every((cell) => cell !== "")) {
    status.textContent = "Draw"
    gameActive = false
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X"
    status.textContent = `Turn: ${currentPlayer}`
  }
}

function updateBoard(): void {
  const cells = document.getElementsByClassName("cell")
  gameBoard.forEach((value, index) => {
    ;(cells[index] as HTMLDivElement).textContent = value
  })
}

function checkWin(): boolean {
  const wc: number[][] = [
    [0, 1, 2], // top
    [3, 4, 5], // middle
    [6, 7, 8], // bottom
    [0, 3, 6], // left
    [1, 4, 7], // middle
    [2, 5, 8], // right
    [0, 4, 8], // diagonal top left
    [2, 4, 6], // diagonal top right
  ]
  return wc.some(([a, b, c]) => {
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]
  })
}


// create board
gameBoard.forEach((_, index) => {
  const cell = document.createElement("div")
  cell.classList.add("cell")
  cell.addEventListener("click", () => cellClick(index))
  board.appendChild(cell)
})

// reset game
document.getElementById("rstt")!.addEventListener("click", () => {
  currentPlayer = "X"
  gameBoard = Array(9).fill("")
  gameActive = true
  status.textContent = `Turn: ${currentPlayer}`
  updateBoard()
})
status.textContent = `Turn: ${currentPlayer}`

