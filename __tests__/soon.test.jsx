import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ComingSoon from "../pages/games/soon";

describe("Coming Soon", () => {
  it("renders a heading", () => {
    const { container } = render(<ComingSoon />);
    const comingSoon = container.querySelector("#soon")?.textContent;
    expect(comingSoon).toEqual("Coming Soon");
  });
});
