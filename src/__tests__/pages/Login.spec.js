import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Login from "../../pages/Login";
import api from "../../services/api";

import MockAdapter from "axios-mock-adapter";

const apiMock = new MockAdapter(api);

const mockHistory = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({ children }) => children,
  useHistory: () => ({
    push: mockHistory,
  }),
}));

describe("Login Page", () => {
  it("should be able to sign in", async () => {
    apiMock.onPost("/user/login").replyOnce(200, {});
    render(<Login authenticated={false} setAuthenticated={() => {}} />);

    const emailField = screen.getByPlaceholderText("Seu melhor email");
    const passwordField = screen.getByPlaceholderText("Uma senha bem segura");
    const buttonElement = screen.getByText("Enviar");

    fireEvent.change(emailField, { target: { value: "johndoe@example.com" } });
    fireEvent.change(passwordField, { target: { value: "123456789" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(emailField).toHaveValue("johndoe@example.com");
      expect(passwordField).toHaveValue("123456789");
      expect(mockHistory).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("should not be able to sign in with invalid credentials", async () => {
    apiMock.onPost("/user/login").replyOnce(200, {});
    render(<Login authenticated={false} setAuthenticated={() => {}} />);

    const emailField = screen.getByPlaceholderText("Seu melhor email");
    const passwordField = screen.getByPlaceholderText("Uma senha bem segura");
    const buttonElement = screen.getByText("Enviar");

    fireEvent.change(emailField, { target: { value: "johndoe@example" } });
    fireEvent.change(passwordField, { target: { value: "123456" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(emailField).toHaveValue("johndoe@example");
      expect(passwordField).toHaveValue("123456");

      expect(screen.getByText(/E-mail inválido/)).toBeInTheDocument();
      expect(screen.getByText(/Mínimo de 8 dígitos/)).toBeInTheDocument();

      expect(mockHistory).not.toHaveBeenCalledWith("/dashboard");
    });
  });
});
