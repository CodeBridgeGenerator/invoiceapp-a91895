import React from "react";
import { render, screen } from "@testing-library/react";

import QuotationItemsCreateDialogComponent from "../QuotationItemsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders quotationItems create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <QuotationItemsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("quotationItems-create-dialog-component")).toBeInTheDocument();
});
