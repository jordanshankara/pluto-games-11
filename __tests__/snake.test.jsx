import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Snake from "../components/snake/Snake";

describe("Snake Body Component", () => {
  it("snake render error", () => {
    const props = [[null], [null]];
    const { container } = render(<Snake snakeDots={props} />);
    const food = container.querySelector("#snakeBody");
    expect(food.innerHTML).not.toContain("style");
  });
  it("renders snake bodies", () => {
    const props = [
      [0, 0],
      [4, 0],
    ];
    const { container } = render(<Snake snakeDots={props} />);
    const food = container.querySelector("#snakeBody");
    expect(food.innerHTML).toContain("style");
  });
});
