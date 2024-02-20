import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Profile from "./Profile";
import { MemoryRouter } from "react-router-dom";
jest.mock("axios");

const renderWithRouter = (ui, { route = "/" } = {}) => {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
};

describe("Profile component", () => {
  // Purpose: Check if the Profile component renders without any issues.
  it("renders Profile component", () => {
    renderWithRouter(<Profile user={{ userID: 1, username: "mockUser" }} />);
    expect(screen.getByText("mockUser")).toBeInTheDocument();
  });
});
