import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import MusicPlayer from "../components/AudioPlayer";

describe("Coming Soon", () => {
  it("renders a heading", () => {
    jest.spyOn(React, "useState").mockReturnValue(["", () => {}]);

    const { container } = render(<MusicPlayer />);
    const audioButton = container.querySelector("#toggleAudio");
    expect(audioButton.tagName).toEqual("BUTTON");
    expect(audioButton.children).not.toBeNull();
  });
});
