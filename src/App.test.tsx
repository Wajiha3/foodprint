import { render } from "@testing-library/react";
import React from "react";
import App from "./App";

test("renders app without crashing", () => {
  render((<App />) as React.ReactNode);
  // Test that the app renders without throwing an error
  expect(document.body).toBeInTheDocument();
});
