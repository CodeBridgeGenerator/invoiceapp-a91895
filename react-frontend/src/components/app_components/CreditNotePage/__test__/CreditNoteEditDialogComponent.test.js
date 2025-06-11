import React from "react";
import { render, screen } from "@testing-library/react";

import CreditNoteEditDialogComponent from "../CreditNoteEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders creditNote edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CreditNoteEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("creditNote-edit-dialog-component")).toBeInTheDocument();
});
