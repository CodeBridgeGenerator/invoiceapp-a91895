import React from "react";
import { render, screen } from "@testing-library/react";

import PurchaseOrderEditDialogComponent from "../PurchaseOrderEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders purchaseOrder edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PurchaseOrderEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("purchaseOrder-edit-dialog-component")).toBeInTheDocument();
});
