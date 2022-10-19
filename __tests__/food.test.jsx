import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Food from "../components/snake/Food";

describe("Snake Food Component", () => {
  it("not rendering snake food", () => {
    const props = [null, null];

    const { container } = render(<Food dot={props} />);
    const food = container.querySelector("#snakeFood");

    expect(food.style[0]).toEqual(undefined);
  });
  it("renders snake food", () => {
    const props = [0, 0];

    const { container } = render(<Food dot={props} />);
    const food = container.querySelector("#snakeFood");

    expect(food.style[0]).toEqual("left");
  });
});
