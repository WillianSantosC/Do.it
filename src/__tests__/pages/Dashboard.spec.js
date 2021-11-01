import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import api from "../../services/api";

import MockAdapter from "axios-mock-adapter";
import Dashboard from "../../pages/Dashboard/index.jsx";

const apiMock = new MockAdapter(api);

describe("Dashboard Page", () => {
  it("should be able to retrieve tasks", async () => {
    apiMock.onGet("/task").replyOnce(200, [
      {
        completed: false,
        createdAt: "2021-11-01T14:52:47.771Z",
        description: "hello",
        owner: "617ffeb9993f280017c6df16",
        updatedAt: "2021-11-01T14:52:47.771Z",
        __v: 0,
        _id: "617fff3f993f280017c6df1c",
      },
    ]);
    render(<Dashboard authenticated />);

    const cards = screen.getByTestId("tasks-container");

    await waitFor(() => {
      expect(cards).toHaveTextContent("hello");
    });
  });
});
