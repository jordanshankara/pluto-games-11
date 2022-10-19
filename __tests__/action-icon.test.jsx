import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ActionIcon } from "../components/rps/ActionIcon";

describe("RPS Action Icon Component", () => {
  it("action button error", () => {
    const { container } = render(<ActionIcon />);
    const icon = container.querySelector("#rpsIcon").src.split("/").pop();
    expect(icon).toEqual("");
  });
  it("renders action button", () => {
    const action = "rock";
    const { container } = render(<ActionIcon action={action} />);
    const icon = container.querySelector("#rpsIcon").src.split("/").pop();
    expect(icon).toEqual("img.jpg");
  });
});
