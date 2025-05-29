import React from "react";
import { render, screen } from "@testing-library/react";

import QuotationItemsPage from "../QuotationItemsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders quotationItems page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <QuotationItemsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("quotationItems-datatable")).toBeInTheDocument();
    expect(screen.getByRole("quotationItems-add-button")).toBeInTheDocument();
});
