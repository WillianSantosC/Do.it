import React from "react";
import { render, screen } from "@testing-library/react";
import Input from "../../components/Input";

describe("Input Component", () => {
  test("should be able to render a input", () => {
    render(
      <Input error="" name="Email" placeholder="Email" register={() => {}} />
    );

    expect(screen.getAllByPlaceholderText("Email")).toBeTruthy();
  });

  test("should be able to render an error", () => {
    render(
      <Input
        error="Campo Obrigatório"
        name="Email"
        placeholder="Email"
        register={() => {}}
      />
    );

    const error = screen.getByText(/Campo Obrigatório/);

    expect(error).toBeTruthy();
  });
});
