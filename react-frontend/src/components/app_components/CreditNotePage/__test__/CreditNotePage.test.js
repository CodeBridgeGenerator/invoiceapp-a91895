import React from "react";
import { render, screen } from "@testing-library/react";

import CreditNotePage from "../CreditNotePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders creditNote page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CreditNotePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("creditNote-datatable")).toBeInTheDocument();
    expect(screen.getByRole("creditNote-add-button")).toBeInTheDocument();
});
