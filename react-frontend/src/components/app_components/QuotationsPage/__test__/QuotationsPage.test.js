import React from "react";
import { render, screen } from "@testing-library/react";

import QuotationsPage from "../QuotationsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders quotations page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <QuotationsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("quotations-datatable")).toBeInTheDocument();
    expect(screen.getByRole("quotations-add-button")).toBeInTheDocument();
});
