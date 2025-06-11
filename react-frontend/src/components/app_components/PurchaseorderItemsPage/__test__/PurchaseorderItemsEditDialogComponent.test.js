import React from "react";
import { render, screen } from "@testing-library/react";

import PurchaseorderItemsEditDialogComponent from "../PurchaseorderItemsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders purchaseorderItems edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PurchaseorderItemsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("purchaseorderItems-edit-dialog-component")).toBeInTheDocument();
});
