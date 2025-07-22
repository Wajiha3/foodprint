import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app without crashing", () => {
  render(<App />);
  // Test that the app renders without throwing an error
  expect(document.body).toBeInTheDocument();
});
