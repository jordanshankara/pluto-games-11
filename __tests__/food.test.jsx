import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Food from "../components/snake/Food";

describe("Snake Food Component", () => {
  it("renders snake food", () => {
    const props = { food: [0, 0] };

    const { container } = render(<Food dot={props.food} />);
    const food = container.querySelector("#snakeFood");

    expect(food).toBeTruthy();
  });
});
