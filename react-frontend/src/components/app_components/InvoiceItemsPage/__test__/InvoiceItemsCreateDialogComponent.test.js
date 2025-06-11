import React from "react";
import { render, screen } from "@testing-library/react";

import InvoiceItemsCreateDialogComponent from "../InvoiceItemsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders invoiceItems create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <InvoiceItemsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("invoiceItems-create-dialog-component")).toBeInTheDocument();
});
