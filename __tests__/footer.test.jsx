import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../components/Footer";

describe("Footer Component", () => {
  it("renders a heading", () => {
    const { container } = render(<Footer />);
    const copyrightText = container.querySelector("#copyright")?.textContent;
    expect(copyrightText).toEqual("© 2020 Copyright Platinum Team 2");
  });
});
