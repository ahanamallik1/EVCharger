import { render } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("renders components based on the route", async () => {
    render(<App />);
  });
});
