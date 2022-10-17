import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders a heading", () => {
    const { container } = render(<Home />);
    const titleText = container.querySelector("#slogan")?.textContent;
    expect(titleText).toEqual(
      "Play fun and challenging games with your friends."
    );
  });
});
