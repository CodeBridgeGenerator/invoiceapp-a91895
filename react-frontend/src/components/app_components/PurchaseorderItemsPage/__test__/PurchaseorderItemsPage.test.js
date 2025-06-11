import React from "react";
import { render, screen } from "@testing-library/react";

import PurchaseorderItemsPage from "../PurchaseorderItemsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders purchaseorderItems page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PurchaseorderItemsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("purchaseorderItems-datatable")).toBeInTheDocument();
    expect(screen.getByRole("purchaseorderItems-add-button")).toBeInTheDocument();
});
