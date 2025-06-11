import React from "react";
import { render, screen } from "@testing-library/react";

import InvoiceItemsPage from "../InvoiceItemsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders invoiceItems page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <InvoiceItemsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("invoiceItems-datatable")).toBeInTheDocument();
    expect(screen.getByRole("invoiceItems-add-button")).toBeInTheDocument();
});
