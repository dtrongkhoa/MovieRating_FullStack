import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("axios");

test("renders Loop Cinemas title", () => {
  render(<App />);
  const titleElement = screen.getByRole("heading", { name: /Loop Cinemas/i });
  expect(titleElement).toBeInTheDocument();
});
