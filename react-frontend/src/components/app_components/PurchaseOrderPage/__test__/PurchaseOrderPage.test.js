import React from "react";
import { render, screen } from "@testing-library/react";

import PurchaseOrderPage from "../PurchaseOrderPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders purchaseOrder page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PurchaseOrderPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("purchaseOrder-datatable")).toBeInTheDocument();
    expect(screen.getByRole("purchaseOrder-add-button")).toBeInTheDocument();
});
