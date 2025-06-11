import React from "react";
import { render, screen } from "@testing-library/react";

import DebitNotePage from "../DebitNotePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders debitNote page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DebitNotePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("debitNote-datatable")).toBeInTheDocument();
    expect(screen.getByRole("debitNote-add-button")).toBeInTheDocument();
});
