import { createBoard } from "@wixc3/react-board";

export default createBoard({
  name: "Blank",
  Board: () => <div>a</div>,
  isSnippet: true,
});
