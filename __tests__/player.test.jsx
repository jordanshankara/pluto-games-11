import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Player } from "../components/rps/Player";

describe("RPS Player Component", () => {
  it("default render player component", () => {
    const { container } = render(<Player />);
    const player = container.querySelector("#playerName").textContent;
    expect(player).toEqual("Player");
  });
  it("render player with props", () => {
    const name = "computer";
    const { container } = render(<Player name={name} />);
    const player = container.querySelector("#playerName").textContent;
    expect(player).toEqual(name);
  });
});
