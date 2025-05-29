import React from "react";
import { render, screen } from "@testing-library/react";

import DebitNoteEditDialogComponent from "../DebitNoteEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders debitNote edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DebitNoteEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("debitNote-edit-dialog-component")).toBeInTheDocument();
});
