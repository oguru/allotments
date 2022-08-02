import React from "react";
import { render } from "@testing-library/react";
import BackArrow from "./BackArrow";

describe("BackArrow tests", () => {
  it("should render", () => {
    expect(render(<BackArrow />)).toBeTruthy();
  });
});
