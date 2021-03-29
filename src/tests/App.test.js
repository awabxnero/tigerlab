import React from "react";
import App from "../App";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";

test("submit application", async () => {
  const history = createMemoryHistory();
  // render the main app component wrapped wiht a mock context with test data
  render(
    <Router history={history}>
      <GlobalContext.Provider
        value={{
          newUser: false,
          age: 25,
          manufacturing: 2015,
          model: "lambo",
          maker: "mercy",
          licence: "3",
          firstName: "awab",
          lastName: "nero",
          dateOfBirth: 25,
          email: "awazzza111111111@gmail.com",
          plateNumber: "WIF170075",
          claims: true,
        }}
      >
        <App />
      </GlobalContext.Provider>
    </Router>
  );
  // Click the next step button
  act(() => {
    const leftClick = { button: 0 };
    userEvent.click(screen.getByText(/Next step/i), leftClick);
  });
  // Check if the plate number field is in the page, meaning you're on the second page and the next step button is working
  act(() => {
    expect(screen.getByText(/Plate number/i)).toBeInTheDocument();
  });
  // Click the submit button
  const leftClick = { button: 0 };
  act(() => {
    userEvent.click(screen.getByTitle(/submit/i), leftClick);
  });
  // wait for the response from the api call made by the submit button, if it's succeful the success dialog should appear
  await waitFor(() => {
    expect(screen.getByTitle(/success/i)).toBeInTheDocument();
  });
});
