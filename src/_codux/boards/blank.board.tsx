import { createBoard } from "@wixc3/react-board";

export default createBoard({
  name: "Blank",
  Board: () => <div className="bg-red-500">act</div>,
  isSnippet: true,
});
