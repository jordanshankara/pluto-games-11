import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Food from "../components/snake/Food";
import Snake from "../components/snake/Snake";

describe("Snake Body Component", () => {
  it("renders snake bodies", () => {
    const props = {
      snakeDots: [
        [0, 0],
        [4, 0],
      ],
    };

    const { container } = render(<Snake snakeDots={props.snakeDots} />);
    const food = container.querySelector("#snakeBody");
    expect(food.innerHTML).toContain('style="left: 0%; top: 0%;"');
  });
});
