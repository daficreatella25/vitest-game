import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "@/App";

// Teset render page

// Tests
describe("Renders main page correctly", async () => {
  it("Should render the page correctly", async () => {
    // Setup
    render(<App />);
  });
});
