import React from "react";
import { render, screen } from "@testing-library/react";

import PurchaseorderItemsCreateDialogComponent from "../PurchaseorderItemsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders purchaseorderItems create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PurchaseorderItemsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("purchaseorderItems-create-dialog-component")).toBeInTheDocument();
});
